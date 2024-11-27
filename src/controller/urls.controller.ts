import { Request, Response, urlencoded } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { URL as UrlValidate } from "url";
import httpStatus from 'http-status';
import { nanoid } from "nanoid";
import { Url } from "../models/urls.model";

export const shortUrl = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const { url } = req.body;

        // when url is not provided
        if (!url) {
            apiResponse.error = 'No url provided';
            apiResponse.status_code = httpStatus.BAD_REQUEST;

            res.status(httpStatus.BAD_REQUEST).send(apiResponse);
            return;
        }

        // check if given url already exists
        const urlExists = await Url.findOne({
            originalUrl: url,
        });

        // checking if the url is valid or not
        const isValidUrl = new UrlValidate(url);

        // we will not create shortId for existing url
        if (urlExists) {
            apiResponse.error = 'Short url already exists';
            apiResponse.status_code = httpStatus.UNPROCESSABLE_ENTITY;

            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(apiResponse);
            return;
        }

        // creating shortId for the url
        const shortUrl = nanoid(10);

        const newShortUrl = new Url({
            originalUrl: url,
            shortId: shortUrl,
        });
        newShortUrl.save();

        apiResponse.data = newShortUrl;
        apiResponse.status_code = httpStatus.CREATED;

        res.status(httpStatus.CREATED).send(apiResponse);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const { shortId } = req.params;

        // when shortId not provided
        if (!shortId) {
            apiResponse.error = 'Please provide shortId';
            apiResponse.status_code = httpStatus.BAD_REQUEST;

            res.status(httpStatus.BAD_REQUEST).send(apiResponse);
            return;
        }

        // check if short url exists with the shortId
        const shortUrlExists = await Url.findOne({ shortId: shortId });

        if (!shortUrlExists) {
            apiResponse.error = 'Url not found';
            apiResponse.status_code = httpStatus.NOT_FOUND;

            res.status(httpStatus.NOT_FOUND).send(apiResponse);
            return;
        }

        // update clicks and lastAccessed
        shortUrlExists.clicks += 1;
        shortUrlExists.lastAccessed = new Date();
        shortUrlExists.save();

        // redirects to the original url
        res.redirect(shortUrlExists.originalUrl);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}

export const getUrlStats = async (req: Request, res: Response) => {
    const apiResponse = new ApiResponse();

    try {
        const { shortId } = req.params;

        // when shortId not provided
        if (!shortId) {
            apiResponse.error = 'No shortId provided';
            apiResponse.status_code = httpStatus.BAD_REQUEST;

            res.status(httpStatus.BAD_REQUEST).send(apiResponse);
            return;
        }

        // check if url exists
        const urlExists = await Url.findOne({ shortId: shortId });

        if (!urlExists) {
            apiResponse.error = "Short url doesn't exists";
            apiResponse.status_code = httpStatus.NOT_FOUND;

            res.status(httpStatus.NOT_FOUND).send(apiResponse);
            return;
        }

        apiResponse.data = {
            clicks: urlExists.clicks,
            lastAccessed: urlExists.lastAccessed,
        }
        apiResponse.status_code = httpStatus.OK;
        
        res.status(httpStatus.OK).send(apiResponse);
    } catch (error) {
        apiResponse.error = error?.toString();
        apiResponse.status_code = httpStatus.INTERNAL_SERVER_ERROR;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(apiResponse);
    }
}

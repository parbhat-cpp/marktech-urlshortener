import express from "express";
import { getUrlStats, redirectToOriginalUrl, shortUrl } from "../controller/urls.controller";

const router = express.Router();

/**
 * Accepts a URL and returns a shortened URL.
 */
router.post("/shorten", shortUrl);

/**
 * Redirects the user to the original URL when accessed with the shortId
 */
router.get("/:shortId", redirectToOriginalUrl);

/**
 * Returns the usage statistics for a specific short URL
 */
router.get("/stats/:shortId", getUrlStats);

export default router;

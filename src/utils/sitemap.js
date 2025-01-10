import { CompanyDetailModel } from '../models/companyDetail.model.js';

export const createEmptySitemap = async () => {
    try {
        const companyDetail = await CompanyDetailModel.findOne();
        if (!companyDetail) {
            throw new Error('Company details not found');
        }

        const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

        companyDetail.sitemap = emptySitemap;
        await companyDetail.save();
        return companyDetail.sitemap;
    } catch (error) {
        throw new Error('Failed to create empty sitemap');
    }
};

export const addServiceToSitemap = async (serviceSlug) => {
    try {
        const companyDetail = await CompanyDetailModel.findOne();
        if (!companyDetail) {
            throw new Error('Company details not found');
        }

        const serviceUrl = `${process.env.WEBSITE_URL}/services/${serviceSlug}`;
        const newSitemapEntry = `
<url>
    <loc>${serviceUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>`;

        const insertPosition = companyDetail.sitemap.lastIndexOf('</urlset>');
        companyDetail.sitemap = companyDetail.sitemap.slice(0, insertPosition) + newSitemapEntry + companyDetail.sitemap.slice(insertPosition);

        await companyDetail.save();
        return companyDetail.sitemap;
    } catch (error) {
        console.log("Failed to update sitemap",error)
        throw new Error('Failed to update sitemap');
    }
};

export const updateServiceInSitemap = async (oldSlug, newSlug) => {
    try {
        const companyDetail = await CompanyDetailModel.findOne();
        if (!companyDetail) {
            throw new Error('Company details not found');
        }

        const oldServiceUrl = `${process.env.WEBSITE_URL}/services/${oldSlug}`;
        const newServiceUrl = `${process.env.WEBSITE_URL}/services/${newSlug}`;
        const newSitemapEntry = `
<url>
    <loc>${newServiceUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</url>`;

        let existingSitemap = companyDetail.sitemap;
        const urlRegex = new RegExp(`<url>\\s*<loc>${oldServiceUrl}</loc>\\s*<lastmod>.*?</lastmod>\\s*</url>`, 'g');

        if (urlRegex.test(existingSitemap)) {
            existingSitemap = existingSitemap.replace(urlRegex, newSitemapEntry);
        } else {
            const insertPosition = existingSitemap.lastIndexOf('</urlset>');
            existingSitemap = existingSitemap.slice(0, insertPosition) + newSitemapEntry + existingSitemap.slice(insertPosition);
        }

        companyDetail.sitemap = existingSitemap;
        await companyDetail.save();
        return companyDetail.sitemap;
    } catch (error) {
        console.error('Failed to update sitemap ❌', error);
        throw new Error('Failed to update sitemap');
    }
};

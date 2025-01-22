import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import { ApiErrorHandler } from "./middlewares/errorHandler.middleware.js";
import { REQUEST_PAYLOAD_LIMIT, API_VERSION, API_PREFIX } from './utils/constants/global.js';
import { captureTraffic } from './middlewares/traffic.middleware.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN];
    
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new ApiError('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_ORIGIN,
// }));


app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(cookieParser());
app.use(express.json({ limit: REQUEST_PAYLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_PAYLOAD_LIMIT }));

app.use(captureTraffic);

import userRouter from "./routes/user.routes.js";
import serviceRouter from "./routes/service.routes.js";
import inquiryRouter from "./routes/inquiry.routes.js";
import blogsRouter from "./routes/blog.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import contactRouter from "./routes/contact.routes.js";
import companyDetailRouter from "./routes/companyDetail.routes.js";
import packageRouter from "./routes/package.routes.js";
import heroSessionRouter from "./routes/heroSection.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import faqRouter from "./routes/faq.router.js";
import aboutRouter from "./routes/about.routes.js";
import homeRouter from "./routes/home.routes.js";
import whatWeDoRouter from "./routes/whatWeDo.routes.js";
import counterRouter from './routes/counter.routes.js';
import privacyPolicyRouter from './routes/privacyPolicy.routes.js';
import ourWorkProcessRouter from './routes/ourWorkProcess.routes.js';
import aboutOurWorkProcessRouter from './routes/aboutOurWorkProcess.routes.js';
import coreValueRouter from './routes/coreValue.routes.js';
import pageMetaTagsRouter from './routes/pageMetaTags.routes.js';
import clientRouter from './routes/client.routes.js';
import partnerRouter from './routes/partner.routes.js';
import ourCoreTeamRouter from './routes/ourCoreTeam.routes.js';
import jobRouter from './routes/job.routes.js';
import errorLogRouter from './routes/errorLog.routes.js';
import trafficRouter from './routes/traffic.routes.js';
import recaptchaRouter from './routes/recaptcha.routes.js';
import projectRouter from './routes/project.routes.js';
import primaryBannerRoutes from './routes/primaryBanner.routes.js';
import innovationRoutes from './routes/innovation.routes.js';
import ApiError from "./utils/ApiError.js";


const API_BASE = `${API_PREFIX}${API_VERSION}`;

// Register Routes
app.use(`${API_BASE}/user`, userRouter);
app.use(`${API_BASE}/services`, serviceRouter);
app.use(`${API_BASE}/inquiries`, inquiryRouter);
app.use(`${API_BASE}/blogs`, blogsRouter);
app.use(`${API_BASE}/comments`, commentsRouter);
app.use(`${API_BASE}/contact-us`, contactRouter);
app.use(`${API_BASE}/company-detail`, companyDetailRouter);
app.use(`${API_BASE}/package`, packageRouter);
app.use(`${API_BASE}/hero-section`, heroSessionRouter);
app.use(`${API_BASE}/testimonials`, testimonialRouter);
app.use(`${API_BASE}/faqs`, faqRouter);
app.use(`${API_BASE}/about-us`, aboutRouter);
app.use(`${API_BASE}/home`, homeRouter);
app.use(`${API_BASE}/what-we-do`, whatWeDoRouter);
app.use(`${API_BASE}/our-work-process`, ourWorkProcessRouter);
app.use(`${API_BASE}/about-our-work-process`, aboutOurWorkProcessRouter);
app.use(`${API_BASE}/core-value`, coreValueRouter);
app.use(`${API_BASE}/page-meta-tags`, pageMetaTagsRouter);
app.use(`${API_BASE}/counters`, counterRouter);
app.use(`${API_BASE}/privacy-policy`, privacyPolicyRouter);
app.use(`${API_BASE}/clients`, clientRouter);
app.use(`${API_BASE}/partners`, partnerRouter);
app.use(`${API_BASE}/our-core-team`, ourCoreTeamRouter);
app.use(`${API_BASE}/jobs`, jobRouter);
app.use(`${API_BASE}/error-logs`, errorLogRouter);
app.use(`${API_BASE}/traffic`, trafficRouter);
app.use(`${API_BASE}/recaptcha`, recaptchaRouter);
app.use(`${API_BASE}/projects`, projectRouter);
app.use(`${API_BASE}/primary-banners`, primaryBannerRoutes);
app.use(`${API_BASE}/innovations`, innovationRoutes);

app.use(ApiErrorHandler);

export default app;

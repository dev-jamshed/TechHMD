const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { ApiErrorHandler } = require("./middlewares/errorHandler.middleware.js");
const { REQUEST_PAYLOAD_LIMIT, API_VERSION, API_PREFIX } = require('./utils/constants/global.js');
const { captureTraffic } = require('./middlewares/traffic.middleware.js');

const app = express();

// app.use(cors({
//     credentials: true,
//     origin: (origin, callback) => {
//         const allowedOrigins = [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN];
    
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new ApiError('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
}));

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(cookieParser());
app.use(express.json({ limit: REQUEST_PAYLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_PAYLOAD_LIMIT }));

app.use(captureTraffic);

const userRouter = require("./routes/user.routes.js");
const serviceRouter = require("./routes/service.routes.js");
const inquiryRouter = require("./routes/inquiry.routes.js");
const blogsRouter = require("./routes/blog.routes.js");
const commentsRouter = require("./routes/comment.routes.js");
const contactRouter = require("./routes/contact.routes.js");
const companyDetailRouter = require("./routes/companyDetail.routes.js");
const packageRouter = require("./routes/package.routes.js");
const heroSessionRouter = require("./routes/heroSection.routes.js");
const testimonialRouter = require("./routes/testimonial.routes.js");
const faqRouter = require("./routes/faq.router.js");
const aboutRouter = require("./routes/about.routes.js");
const homeRouter = require("./routes/home.routes.js");
const whatWeDoRouter = require("./routes/whatWeDo.routes.js");
const counterRouter = require('./routes/counter.routes.js');
const privacyPolicyRouter = require('./routes/privacyPolicy.routes.js');
const ourWorkProcessRouter = require('./routes/ourWorkProcess.routes.js');
const aboutOurWorkProcessRouter = require('./routes/aboutOurWorkProcess.routes.js');
const coreValueRouter = require('./routes/coreValue.routes.js');
const pageMetaTagsRouter = require('./routes/pageMetaTags.routes.js');
const clientRouter = require('./routes/client.routes.js');
const partnerRouter = require('./routes/partner.routes.js');
const ourCoreTeamRouter = require('./routes/ourCoreTeam.routes.js');
const jobRouter = require('./routes/job.routes.js');
const errorLogRouter = require('./routes/errorLog.routes.js');
const trafficRouter = require('./routes/traffic.routes.js');
const recaptchaRouter = require('./routes/recaptcha.routes.js');
const projectRouter = require('./routes/project.routes.js');
const primaryBannerRoutes = require('./routes/primaryBanner.routes.js');
const innovationRoutes = require('./routes/innovation.routes.js');
const ApiError = require("./utils/ApiError.js");

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

module.exports = app;

module.exports = {
    siteUrl: 'https://socialpoll.me',
    generateRobotsTxt: true, // (optional)
    changefreq: null,
    priority: null,
    // ...other options
    exclude: ['/contact','/privacy','/tos', '/about','/imprint','/server-sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://socialpoll.me/server-sitemap-index.xml', // <==== Add here
        ],
    },
}

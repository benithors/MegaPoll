module.exports = {
    siteUrl: 'https://socialpoll.me',
    generateRobotsTxt: true, // (optional)
    // ...other options
    exclude: ['/contact','/privacy','/tos', '/imprint','/server-sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://socialpoll.me/server-sitemap-index.xml', // <==== Add here
        ],
    },
}

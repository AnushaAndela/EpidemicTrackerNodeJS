exports.dbConfig={
    server: ".",
        database: "EpidemicTracker",
        driver: "msnodesqlv8",
        port: 1433,
        options: {
            trustedConnection: true,
        }
};

exports.webPort=5000;

exports.httpMsgsFormat="HTML";
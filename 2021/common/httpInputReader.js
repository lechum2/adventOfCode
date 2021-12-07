import fs from "fs";
import https from "https";

const options = {
    hostname: "adventofcode.com",
    port: 443,
    method: "GET",
};

export function getInput(year, day, separator = "\n", type = String) {
    const token = fs.readFileSync("token").toString(); //.split(separator).map(type);
    options.path = `/${year}/day/${day}/input`;
    options.headers = {
        Cookie: `session=${token}`,
    };

    let body = [];

    const req = https.request(options, (res) => {
        res.on("data", (chunk) => {
            body.push(chunk);
        });
        res.on("end", () => {
            body = Buffer.concat(body).toString();
            console.log(body);
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });
    req.end();
}

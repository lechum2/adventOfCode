import fs from "fs";
import axios from "axios";

export async function getInput(year, day, separator = "\n", type = String) {
    const token = fs.readFileSync("token").toString();
    try {
        const response = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
            headers: {
                Cookie: `session=${token}`,
            },
        });
        return response.data.toString().split(separator).map(type);
    } catch (error) {
        console.error(error);
    }
}

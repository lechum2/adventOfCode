use reqwest::header;
use std::fs;

pub fn get_input(year: i32, day: i32, separator: &str) -> Vec<String> {
    let token = fs::read_to_string("token").expect("Could not read token file");
    let mut header_value =
        header::HeaderValue::from_str(format!("session={token}").trim()).unwrap();
    header_value.set_sensitive(true);
    let mut headers = header::HeaderMap::new();
    headers.insert("Cookie", header_value);
    let client = reqwest::blocking::Client::builder()
        .default_headers(headers)
        .build()
        .unwrap();
    let response = client
        .get(format!("https://adventofcode.com/{year}/day/{day}/input"))
        .send()
        .expect("Input request failed")
        .text()
        .unwrap();
    let mut input_vector = Vec::new();
    for s in response.split(separator) {
        input_vector.push(s.to_owned());
    }
    input_vector
}

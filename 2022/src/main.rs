mod http_input_reader;

fn main() {
    println!("Hello, world!");
    http_input_reader::get_input(2022, 1, "\n".to_string());
}

mod http_input_reader;

fn main() {
    println!("Hello, world!");
    let input_vector = http_input_reader::get_input(2022, 1, "\n");
    println!("{:?}", input_vector);
}

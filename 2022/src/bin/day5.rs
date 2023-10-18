use std::collections::BinaryHeap;
use regex::Regex;

struct Cargo {
    stacks: Vec::<BinaryHeap<char>>
}

impl Cargo {
    fn from(input: Vec<&str>) -> Self {
        let cargo = Cargo {
            stacks: Vec::<BinaryHeap<char>>::new(),
        };

        let number_regex = Regex::new(r"[0-9]+").unwrap();
        let match_crate = Regex::new(r"[ ]{3}|[A-Z]+").unwrap();
        let stacks_count = number_regex.captures(input.get(0).unwrap()).unwrap().len();

        for i in 0..input.len() {


        }
        return cargo;
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 5, "\n");
}

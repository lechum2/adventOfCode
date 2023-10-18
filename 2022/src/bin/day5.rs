use std::collections::BinaryHeap;
use regex::Regex;

#[derive(Debug)]
struct Cargo {
    stacks: Vec::<BinaryHeap<char>>
}

impl PartialEq for Cargo {
    fn eq(&self, other: &Self) -> bool {
        if self.stacks.len() != other.stacks.len() {
            return false;
        }
        for i in 0..self.stacks.len() {
            if self.stacks.get(i).unwrap().len() != other.stacks.get(i).unwrap().len() {
                return false;
            }
            if self.stacks.get(i).unwrap().peek() != other.stacks.get(i).unwrap().peek() {
                return false;
            }
        }

        return true;
    }
}

impl Cargo {
    fn from(input: Vec<&str>) -> Self {
        let mut cargo = Cargo {
            stacks: Vec::<BinaryHeap<char>>::new(),
        };

        let number_regex = Regex::new(r"[0-9]+").unwrap();
        let match_crate = Regex::new(r"[ ]{3}|[A-Z]+").unwrap();
        let stacks_count = number_regex.find_iter(input.get(0).unwrap()).count();
        println!("Number of stacks found: {stacks_count}");
        for _i in 0..stacks_count {
            cargo.stacks.push(BinaryHeap::<char>::new());
        }

        for i in 1..input.len() {
            let crates: Vec<&str> = match_crate.find_iter(input.get(i).unwrap()).map(|c| c.as_str()).collect();
            for j in 0..stacks_count {
                let crate_letter = crates.get(j).unwrap();
                if !crate_letter.trim().is_empty() {
                    cargo.stacks.get_mut(j).unwrap().push(crate_letter.chars().next().unwrap());
                }
            }
        }
        return cargo;
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 5, "\n");
}

#[cfg(test)]
mod day5_test {
    use std::collections::BinaryHeap;

    #[test]
    fn should_create_structre_from_text_input() {
        let input = vec![
            " 1   2   3 ",
            "[Z] [M] [P]",
            "[N] [C]    ",
            "    [D]    ",
        ];

        let result = crate::Cargo::from(input);
        let expected = crate::Cargo {
            stacks: vec![
                BinaryHeap::from(['Z', 'N']),
                BinaryHeap::from(['M', 'C', 'D']),
                BinaryHeap::from(['P']),
            ]
        };
        assert_eq!(result, expected)
    }

}

use regex::Regex;

#[derive(Debug, PartialEq)]
struct Cargo {
    stacks: Vec::<Vec::<char>>
}

impl Cargo {
    fn from(mut input: Vec<&str>) -> Self {
        input.reverse();
        let mut cargo = Cargo {
            stacks: Vec::<Vec::<char>>::new(),
        };

        let number_regex = Regex::new(r"[0-9]+").unwrap();
        let match_crate = Regex::new(r"[ ]{3}|[A-Z]+").unwrap();
        let stacks_count = number_regex.find_iter(input.get(0).unwrap()).count();
        for _i in 0..stacks_count {
            cargo.stacks.push(Vec::<char>::new());
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
    let mut input_iterator = input_vector.iter();
    let mut initial_state = Vec::<&str>::new();
    let mut line = input_iterator.next();
    while line != None {
        if line.unwrap().is_empty() {
            break;
        }
        initial_state.push(line.unwrap());
        line = input_iterator.next();
    }
    let cargo_space = Cargo::from(initial_state);
    println!("{:?}", cargo_space);
    line = input_iterator.next();
    println!("next line is: {:?}", line);
}

#[cfg(test)]
mod day5_test {
    #[test]
    fn should_create_structre_from_text_input() {
        let input = vec![
            "    [D]    ",
            "[N] [C]    ",
            "[Z] [M] [P]",
            " 1   2   3 ",
        ];

        let result = crate::Cargo::from(input);
        let expected = crate::Cargo {
            stacks: vec![
                vec!['Z', 'N'],
                vec!['M', 'C', 'D'],
                vec!['P'],
            ]
        };
        assert_eq!(result, expected)
    }

}

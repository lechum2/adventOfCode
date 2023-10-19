use regex::Regex;

#[derive(Debug, PartialEq)]
struct Cargo {
    stacks: Vec::<Vec::<char>>
}

impl fmt::Debug for Cargo {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point [{} {}]", self.x, self.y)
    }
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

    fn move_crate(&mut self, count: usize, from: usize, to: usize) {
        for _i in 0..count {
            let crate_letter: char = self.stacks.get_mut(from - 1).unwrap().pop().unwrap_or(' ');
            if crate_letter == ' ' {
                continue;
            }
            self.stacks.get_mut(to - 1).unwrap().push(crate_letter);
        }
    }

    fn apply_command(&mut self, command: &str) {
        println!("Applying command: {command}");
        let paramters: Vec<&str> = command.split(" ").collect();
        self.move_crate(
            paramters.get(1).unwrap().parse().unwrap(),
            paramters.get(3).unwrap().parse().unwrap(),
            paramters.get(5).unwrap().parse().unwrap(),
        );
    }
    fn print_top(&self) {
        for stack in &self.stacks {
            print!("{}", stack.last().unwrap_or(&' '));
        }
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
    let mut cargo_space = Cargo::from(initial_state);

    line = input_iterator.next();
    while line != None {
        if line.unwrap().is_empty() {
            break;
        }
        cargo_space.apply_command(line.unwrap());
        line = input_iterator.next();
    }
    cargo_space.print_top();
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

    #[test]
    fn should_move_crates() {
        let mut cargo_space = crate::Cargo {
            stacks: vec![
                vec!['Z', 'N'],
                vec!['M', 'C', 'D'],
                vec!['P'],
            ]
        };
        cargo_space.move_crate(2, 1, 3);

        let expected = crate::Cargo {
            stacks: vec![
                vec![],
                vec!['M', 'C', 'D'],
                vec!['P', 'N', 'Z'],
            ]
        };
        assert_eq!(cargo_space, expected);
    }

    #[test]
    fn should_execute_command() {

        let mut cargo_space = crate::Cargo {
            stacks: vec![
                vec!['Z', 'N'],
                vec!['M', 'C', 'D'],
                vec!['P'],
            ]
        };
        cargo_space.apply_command("move 2 from 1 to 3");

        let expected = crate::Cargo {
            stacks: vec![
                vec![],
                vec!['M', 'C', 'D'],
                vec!['P', 'N', 'Z'],
            ]
        };
        assert_eq!(cargo_space, expected);
    }
}

enum GameChoise {
    Rock,
    Paper,
    Scissors
}

impl GameChoise {
    fn points(&self) -> u8 {
        match self {
            GameChoise::Rock => 1,
            GameChoise::Paper => 2,
            GameChoise::Scissors => 3
        }
    }

    fn score_with(&self, other: &GameChoise) -> u8 {
        match self {
            GameChoise::Rock => {
                match other {
                    GameChoise::Rock => 3,
                    GameChoise::Paper => 0,
                    GameChoise::Scissors => 6,
                }
            }
            GameChoise::Paper => {
                match other {
                    GameChoise::Rock => 6,
                    GameChoise::Paper => 3,
                    GameChoise::Scissors => 0,
                }
            }
            GameChoise::Scissors => {
                match other {
                    GameChoise::Rock => 0,
                    GameChoise::Paper => 6,
                    GameChoise::Scissors => 3,
                }
            }
        }
    }

    fn from(letter: &str) -> GameChoise {
        match letter {
            (&"A", &"X") => GameChoise::Paper,
            _ => panic!("Not supported letter")
        }
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 2, "\n");
    let mut score = 0;
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let choices:Vec<&str> = line.split(" ").collect();
        match choices.get(1) {
            Some(&"X") => {
                score += 1;
                match choices.get(0) {
                    Some(&"C") => score += 6,
                    Some(&"A") => score += 3,
                    _ => ()
                }
            },
            Some(&"Y") => {
                score += 2;
                match choices.get(0) {
                    Some(&"A") => score += 6,
                    Some(&"B") => score += 3,
                    _ => ()
                }
            },
            Some(&"Z") => {
                score += 3;
                match choices.get(0) {
                    Some(&"B") => score += 6,
                    Some(&"C") => score += 3,
                    _ => ()
                }
            }
            _ => panic!("Unsupported value found: {:?}", choices.get(1).unwrap())
        }
    }

    println!("The final score is {score}");
}

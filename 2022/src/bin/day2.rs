enum GameChoise {
    Rock,
    Paper,
    Scissors
}

impl GameChoise {
    fn points(&self) -> u32 {
        match self {
            GameChoise::Rock => 1,
            GameChoise::Paper => 2,
            GameChoise::Scissors => 3
        }
    }

    fn score_with(&self, other: &GameChoise) -> u32 {
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
            "A" | "X" => GameChoise::Rock,
            "B" | "Y" => GameChoise::Paper,
            "C" | "Z" => GameChoise::Scissors,
            _ => panic!("Unsupported value found: {:?}", letter)
        }
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 2, "\n");
    let mut score: u32 = 0;
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let choices: Vec<&str> = line.split(" ").collect();
        let opponent = GameChoise::from(choices.get(0).unwrap());
        let me = GameChoise::from(choices.get(1).unwrap());
        score += me.points();
        score += me.score_with(&opponent);
    }

    println!("The final score is {score}");
}

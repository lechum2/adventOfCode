use std::cmp::Ordering;

#[derive(PartialEq, Copy, Clone, Debug)]
enum GameChoise {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
}

impl PartialOrd for GameChoise {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        if *self == GameChoise::Rock && *other == GameChoise::Scissors
            || *self == GameChoise::Paper && *other == GameChoise::Rock
            || *self == GameChoise::Scissors && *other == GameChoise::Paper
        {
            return Some(Ordering::Greater);
        }
        return Some(Ordering::Less);
    }
}

impl GameChoise {
    fn points(&self) -> u32 {
        *self as u32
    }

    fn result(&self, other: &Self) -> GameResult {
        if *self == *other {
            return GameResult::Draw;
        }
        if *self > *other {
            return GameResult::Win;
        }
        return GameResult::Loss;
    }

    fn from(letter: &str) -> Self {
        match letter {
            "A" | "X" => GameChoise::Rock,
            "B" | "Y" => GameChoise::Paper,
            "C" | "Z" => GameChoise::Scissors,
            _ => panic!("Unsupported value found: {:?}", letter),
        }
    }
}

#[derive(PartialEq, Copy, Clone, Debug)]
enum GameResult {
    Loss = 0,
    Draw = 3,
    Win = 6,
}

impl GameResult {
    fn score(&self) -> u32 {
        *self as u32
    }

    fn from(letter: &str) -> Self {
        match letter {
            "X" => GameResult::Loss,
            "Y" => GameResult::Draw,
            "Z" => GameResult::Win,
            _ => panic!("Unsupported value found: {:?}", letter),
        }
    }

    fn other_choise(&self, choise: &GameChoise) -> GameChoise {
        if *self == GameResult::Draw {
            println!("Game result is draw {self:?}, so we both choose {choise:?}");
            return *choise;
        }
        let all_possible_values = [GameChoise::Rock, GameChoise::Paper, GameChoise::Scissors];
        for value in all_possible_values {
            if *self == GameResult::Win && value > *choise {
                println!("Game result should be win {self:?}, opponent {choise:?}, me {value:?}");
                return value;
            }
            else if *self == GameResult::Loss && value < *choise {
                println!("Game result should be loss {self:?}, opponent {choise:?}, me {value:?}");
                return value;
            }
        }
        panic!("Could not find the proper choice for current condition");
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 2, "\n");
    let mut score1: u32 = 0;
    let mut score2: u32 = 0;
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let choices: Vec<&str> = line.split(" ").collect();
        let opponent = GameChoise::from(choices.get(0).unwrap());
        let me = GameChoise::from(choices.get(1).unwrap());
        score1 += me.points();
        score1 += me.result(&opponent).score();
        let result = GameResult::from(choices.get(1).unwrap());
        score2 += result.score();
        score2 += result.other_choise(&opponent).points();
    }

    println!("The final score is {score1}");
    println!("The final score for second method is {score2}");
}

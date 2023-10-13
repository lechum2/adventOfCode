#[cfg(test)]
mod test {
    #[test]
    fn day3_when_given_string_should_find_duplicated_char() {
        let input = "vJrwpWtwJgWrhcsFMMfFFhFp";
        let result = crate::get_duplicated_char(&input);
        assert_eq!(result, 'p');
    }
}

fn get_duplicated_char(line: &str) -> char {
    let chars: Vec<char> = line.chars().collect();
    let half_len = chars.len() / 2;
    for i in 0..half_len - 1 {
        for j in 1..half_len {
            let left_char = *chars.get(i).unwrap();
            let right_char = *chars.get(half_len + j).unwrap();
            println!("left is {left_char} and right is {right_char}");
            if left_char == right_char {
                return *chars.get(i).unwrap();
            }
        }
    }
    panic!("No duplicate char found!");
}

fn main() {
}

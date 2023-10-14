use std::collections::HashSet;

#[cfg(test)]
mod day3_test {
    use std::collections::HashSet;

    #[test]
    fn when_given_string_should_find_all_duplicated_chars() {
        let input = "vlJrwpWtwJgWrhcsFMMfFFhFpl";
        let result = crate::get_duplicated_chars(&input);
        let mut expected = HashSet::new();
        expected.insert('l');
        expected.insert('p');
        assert_eq!(result, expected);
    }

    #[test]
    fn when_given_string_should_find_duplicated_char() {
        let input = "cvvcll";
        let result = crate::get_duplicated_chars(&input);
        let mut expected = HashSet::new();
        expected.insert('c');
        assert_eq!(result, expected);
    }

    #[test]
    fn when_given_duplicates_at_corners_should_find_duplicated_char() {
        let input = "cvxxzc";
        let result = crate::get_duplicated_chars(&input);
        let mut expected = HashSet::new();
        expected.insert('c');
        expected.insert('x');
        assert_eq!(result, expected);
    }

    #[test]
    fn when_given_char_should_return_proper_value() {
        let input = 'Z';
        let result = crate::get_char_value(input);
        assert_eq!(result, 52);
    }
}

fn get_duplicated_chars(line: &str) -> HashSet<char> {
    let chars: Vec<char> = line.chars().collect();
    let half_len = chars.len() / 2;
    let mut result = HashSet::new();
    for i in 0..half_len {
        let left_char = *chars.get(i).unwrap();
        for j in 0..half_len {
            let right_char = *chars.get(half_len + j).unwrap();
            if left_char == right_char {
                result.insert(left_char);
            }
        }
    }
    return result;
}

fn get_char_value(letter: char) -> u32 {
    if letter >= 'a' && letter <= 'z' {
        return letter as u32 - 'a' as u32 + 1;
    } else if letter >= 'A' && letter <= 'Z' {
        return letter as u32 - 'A' as u32 + 27;
    }
    panic!("Not supported character: {letter}");
}

fn main() {
    let input_vector = input_reader::get_input(2022, 3, "\n");
    let mut result: u32 = 0;
    for line in &input_vector {
        if line.is_empty() {
            continue;
        }
        for duplicate in get_duplicated_chars(&line) {
            result += get_char_value(duplicate);
        }
    }
    println!("Result is: {result}");

    let mut result2: u32 = 0;
    for i in 0..input_vector.len() / 3 {
        for badge in input_vector[i * 3].chars() {
            if input_vector[i * 3 + 1].chars().any(|c| c == badge)
                && input_vector[i * 3 + 2].chars().any(|c| c == badge)
            {
                result2 += get_char_value(badge);
                break;
            }
        }
    }
    println!("Result for the second problem is {result2}");
}

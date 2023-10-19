fn get_packet_marker_start(signal: &str) -> usize {
    let chars: Vec<char> = signal.chars().collect();
    for i in 3..chars.len() {
        if chars.get(i).unwrap() != chars.get(i - 1).unwrap()
            && chars.get(i).unwrap() != chars.get(i - 2).unwrap()
            && chars.get(i).unwrap() != chars.get(i - 3).unwrap()
            && chars.get(i - 1).unwrap() != chars.get(i - 2).unwrap()
            && chars.get(i - 1).unwrap() != chars.get(i - 3).unwrap()
            && chars.get(i - 2).unwrap() != chars.get(i - 3).unwrap()
        {
            return i + 1;
        }
    }
    return chars.len();
}

fn has_unique_elements<T>(iter: T) -> bool
where
    T: IntoIterator,
    T::Item: Eq + Hash,
{
    let mut uniq = HashSet::new();
    iter.into_iter().all(move |x| uniq.insert(x))
}

fn main() {
    let input_vector = input_reader::get_input(2022, 6, "\n");
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let result = get_packet_marker_start(line.as_str());
        println!("Marker found at: {}", result);
    }
}

#[cfg(test)]
mod day6_test {
    #[test]
    fn should_find_marker_at_5() {
        let result = crate::get_packet_marker_start("bvwbjplbgvbhsrlpgdmjqwftvncz");
        assert_eq!(5, result);
    }

    #[test]
    fn should_find_marker_at_11() {
        let result = crate::get_packet_marker_start("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw");
        assert_eq!(11, result);
    }
}

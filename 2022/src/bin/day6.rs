use std::collections::HashSet;

fn get_packet_marker_start(signal: &str, unique_num: usize) -> usize {
    let chars: Vec<char> = signal.chars().collect();
    for i in (unique_num - 1)..chars.len() {
        let mut uniq = HashSet::new();
        let mut all_uniq = true;
        for j in 0..unique_num {
            all_uniq &= uniq.insert(chars.get(i - j).unwrap().clone());
        }
        if all_uniq {
            return i + 1;
        }
    }
    return chars.len();
}

fn main() {
    let input_vector = input_reader::get_input(2022, 6, "\n");
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let result = get_packet_marker_start(line.as_str(), 4);
        println!("Marker found at: {}", result);
        let message_marker = get_packet_marker_start(line.as_str(), 14);
        println!("Message marker found at: {}", message_marker);
    }
}

#[cfg(test)]
mod day6_test {
    #[test]
    fn should_find_marker_at_5() {
        let result = crate::get_packet_marker_start("bvwbjplbgvbhsrlpgdmjqwftvncz", 4);
        assert_eq!(5, result);
    }

    #[test]
    fn should_find_marker_at_11() {
        let result = crate::get_packet_marker_start("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4);
        assert_eq!(11, result);
    }

    #[test]
    fn should_find_message_marker_at_19() {
        let result = crate::get_packet_marker_start("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14);
        assert_eq!(19, result);
    }

    #[test]
    fn should_find_message_marker_at_29() {
        let result = crate::get_packet_marker_start("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14);
        assert_eq!(29, result);
    }
}

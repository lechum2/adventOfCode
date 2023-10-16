#[derive(Debug)]
struct Assignment {
    from: u32,
    to: u32,
}

impl Assignment {
    fn from(string: &str) -> Self {
        let values: Vec<&str> = string.split("-").collect();
        let from = values.get(0).unwrap();
        let to = values.get(1).unwrap();
        return Assignment {
            from: from.parse().unwrap(),
            to: to.parse().unwrap(),
        }
    }

    fn contains(&self, other: &Assignment) -> bool {
        if self.from <= other.from && self.to >= other.to {
            return true;
        }
        return false;
    }

    fn overlaps_with(&self, other: &Assignment) -> bool {
        if self.from <= other.from && self.to >= other.from {
            return true;
        } else if self.from >= other.from && self.from <= other.to {
            return true;
        }
        return false;
    }
}

fn main() {
    let input_vector = input_reader::get_input(2022, 4, "\n");
    let mut count_containing: u32 = 0;
    let mut count_overlapping: u32 = 0;
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        let assignment_strings: Vec<&str> = line.split(",").collect();
        let first_assignment = Assignment::from(assignment_strings.get(0).unwrap());
        let second_assignment = Assignment::from(assignment_strings.get(1).unwrap());
        if first_assignment.contains(&second_assignment)
            || second_assignment.contains(&first_assignment)
        {
            count_containing += 1;
        }
        if first_assignment.overlaps_with(&second_assignment) {
            count_overlapping += 1;
        }
    }
    println!("Assingments count that one contains the other: {count_containing}");
    println!("Assingments count that overlap: {count_overlapping}");
}

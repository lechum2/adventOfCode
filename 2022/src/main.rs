mod http_input_reader;

fn main() {
    let input_vector = http_input_reader::get_input(2022, 1, "\n");
    println!("{:?}", input_vector);
    let mut max_total_calories = 0;
    let mut elf_total_calories = 0;
    for line in input_vector {
        if line == "" {
            if elf_total_calories > max_total_calories {
                max_total_calories = elf_total_calories;
            }
            elf_total_calories = 0;
        } else {
            elf_total_calories += line.parse::<i32>().unwrap();
        }
    }
    if elf_total_calories > max_total_calories {
        max_total_calories = elf_total_calories;
    }
    println!("{:?}", max_total_calories);
}

mod http_input_reader;

fn main() {
    let input_vector = http_input_reader::get_input(2022, 1, "\n");
    let mut elf_total_calories = Vec::new();
    let mut single_elf_calories = 0;
    for line in input_vector {
        if line == "" {
            elf_total_calories.push(single_elf_calories);
            single_elf_calories = 0;
        } else {
            single_elf_calories += line.parse::<i32>().unwrap();
        }
    }
    elf_total_calories.sort();
    elf_total_calories.reverse();
    print!("Elf with max calories has {:?}", elf_total_calories.get(0).unwrap());
    print!(
        "Top 3 elfs have {:?} calories",
        elf_total_calories.get(0).unwrap()
        + elf_total_calories.get(1).unwrap()
        + elf_total_calories.get(2).unwrap()
    );
}

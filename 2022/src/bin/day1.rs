fn main() {
    let input_vector = input_reader::get_input(2022, 1, "\n");
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
    println!(
        "Elf with max calories has {:?}",
        elf_total_calories.last().unwrap()
    );
    println!(
        "Top 3 elfs have {:?} calories",
        elf_total_calories.pop().unwrap()
            + elf_total_calories.pop().unwrap()
            + elf_total_calories.pop().unwrap()
    );
}

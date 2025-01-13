struct Directory<'a> {
    sub_directories: Vec<&'a Directory<'a>>,
    files: Vec<&'a File<'a>>,
    name: String,
}

struct File<'a> {
    name: &'a str,
    size: u32,
}

impl Directory<'_> {
    fn size(&self) -> u32 {
        let mut size: u32 = 0;
        size += self.sub_directories.iter().fold(0, |sum, dir| sum + dir.size());
        size += self.files.iter().fold(0, |sum, file| sum + file.size);
        return size;
    }
}

fn main() {
    let input = input_reader::get_input(2022, 7, "\n");
    let mut path:Vec<Directory> = Vec::new();
    let root = Directory {
        name: String::from("/"),
        files: Vec::new(),
        sub_directories: Vec::new(),
    };
    path.push(root);
    let mut current_dir = path.last_mut().unwrap();
    for line in input {
        if line.is_empty() {
            continue;
        }
        let values: Vec<&str> = line.split_ascii_whitespace().collect();
        if is_command(&values) {
            let command = *values.get(1).unwrap();
            match command {
                "cd" => {
                    let dir_name = *values.get(2).unwrap();
                    if current_dir.name != dir_name {
                        for dir in current_dir.sub_directories.clone() {
                            if dir.name == dir_name {
                                let new_dir = Directory {
                                    name: dir_name.to_string(),
                                    files: Vec::new(),
                                    sub_directories: Vec::new()
                                };
                                path.push(new_dir);
                                current_dir = path.last_mut().unwrap();
                            }
                        }
                    }
                },
                _ => panic!("Unsupported command: {}", command),

            }
        }
    }
}

fn is_command(values: &Vec<&str>) -> bool {
    if *values.get(0).unwrap() == "$" {
        return true;
    }
    return false;
}

#[cfg(test)]
mod day7_test {
    use crate::File;
    use crate::Directory;

    #[test]
    fn should_sum_one_file_in_directory() {
        let mut dir1 = Directory {
            name: String::from("dir1"),
            files: Vec::new(),
            sub_directories: Vec::new(),
        };
        let file1 = File {
            name: "file1",
            size: 10,
        };
        dir1.files.push(&file1);
        assert_eq!(10, dir1.size());
    }
    #[test]
    fn should_sum_directory_in_directory() {
        let mut dir1 = Directory {
            name: String::from("dir1"),
            files: Vec::new(),
            sub_directories: Vec::new(),
        };
        let file1 = File {
            name: "file1",
            size: 10,
        };
        dir1.files.push(&file1);
        let mut dir2 = Directory {
            name: String::from("dir2"),
            files: Vec::new(),
            sub_directories: Vec::new(),
        };
        let file2 = File {
            name: "file2",
            size: 20,
        };
        dir2.files.push(&file2);
        dir1.sub_directories.push(&dir2);
        assert_eq!(30, dir1.size());
    }
}

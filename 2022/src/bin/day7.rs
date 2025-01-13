struct Directory {
    sub_directories: Vec<Directory>,
    files: Vec<File>,
    name: String,
}

struct File {
    name: String,
    size: u32,
}

impl Directory {
    fn size(&self) -> u32 {
        let mut size: u32 = 0;
        size += self.sub_directories.iter().fold(0, |sum, dir| sum + dir.size());
        size += self.files.iter().fold(0, |sum, file| sum + file.size);
        return size;
    }
}

fn main() {
    let input = input_reader::get_input(2022, 7, "\n");
    let mut path:Vec<&Directory> = Vec::new();
    let root = Directory {
        name: String::from("/"),
        files: Vec::new(),
        sub_directories: Vec::new(),
    };
    path.push(&root);
    let mut current_dir = &mut root;
    for line in input {
        println!("Read line: {}", line);
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
                        for dir in current_dir.sub_directories.iter() {
                            if dir.name == dir_name {
                                path.push(dir);
                                current_dir = dir;
                            }
                        }
                    }
                },
                "ls" => {
                    continue;
                },
                _ => panic!("Unsupported command: {}", command),

            }
        } else {
            if *values.get(0).unwrap() == "dir" {
                current_dir.sub_directories.push(
                    Directory {
                        name: values.get(1).unwrap().clone().to_string(),
                        sub_directories: Vec::new(),
                        files: Vec::new()
                    }
                )
            } else {
                current_dir.files.push(
                    File {
                        name: values.get(1).unwrap().clone().to_string(),
                        size: values.get(0).unwrap().parse::<u32>().unwrap()
                    }
                )
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

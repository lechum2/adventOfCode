struct Directory<'a> {
    sub_directories: Vec<&'a Directory<'a>>,
    files: Vec<&'a File<'a>>,
    name: &'a str,
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
    let input_vector = input_reader::get_input(2022, 7, "\n");
    for line in input_vector {
        if line.is_empty() {
            continue;
        }
        println!("{}", line);
    }
}

#[cfg(test)]
mod day7_test {
    use crate::File;
    use crate::Directory;

    #[test]
    fn should_sum_one_file_in_directory() {
        let mut dir1 = Directory {
            name: "dir1",
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
            name: "dir1",
            files: Vec::new(),
            sub_directories: Vec::new(),
        };
        let file1 = File {
            name: "file1",
            size: 10,
        };
        dir1.files.push(&file1);
        let mut dir2 = Directory {
            name: "dir2",
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

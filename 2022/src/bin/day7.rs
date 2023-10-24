struct Directory<'a> {
    parent: &'a Directory<'a>,
    sub_directories: Vec<&'a Directory<'a>>,
    files: Vec<&'a File<'a>>,
    name: &'a str,
}

struct File<'a> {
    parent: &'a Directory<'a>,
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

}

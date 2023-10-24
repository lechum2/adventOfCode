struct Directory {
    parent: &Directory;
    sub_directories: Vec<&Directory>;
    files: Vec<&File>;
    name: &str;
}

struct File {
    parent: &Directory;
    name: &str;
    size: u32;
}

impl Directory {
    fn size(&self) {
        let size: u32 = 0;
        size += self.sub_directories.reduce();
        size += self.files.reduce();
    }
}

fn main() {

}

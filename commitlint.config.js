export default {
    // Kế thừa rule cơ bản từ bộ quy tắc Conventional Commits
    extends: ['@commitlint/config-conventional'],

    //Custom parser để định nghĩa format commit header
    parserPreset: {
        parserOpt: {
            //Regex parse commit message
            // Format: <type>/#<scope>: <subject>
            // Ví dụ: feat/#auth: thêm chức năng đăng nhập với JWT
            headerPattern: /^(\w*)\/#(\w*): (.*)$/,

            //Ánh xạ các group trong regex vào các field của commitlint
            headerCorrespondence: ['type', 'scope', 'subject'],
        },
    },

    // Các rules để enforce commit message
    rules: {
        // Chỉ cho phép type thuộc danh sách này 
        // feat = thêm chức năng , fix = sửa bug, docs =  tài liệu,
        // style = format code, refactor = tối ưu, test = test code
        // chore = việc vặt, revert = rollback commit
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
        ],
        //Header (toàn bộ commit message dòng đầu) tối thiểu 10 ký tự
        'header-min-length': [2, 'always', 10],

        //Header tối đa 100 ký tự
        'header-max-length': [2, 'always', 100],

        //Body (nội dung chi tiết commit) mỗi dòng tối đa 120 ký tự
        'body-max-length': [2, 'always', 120],

        // Subject (phần mô tả ngắn) không bị ép theo style nào
        // Đang disable (0=off), nên có thể viết hoa/viết thường tự do
        // Ví dụ: "thêm chức năng login" và "Thêm chức năng login" đều pass
        'subject-case': [
            0, //off
            'never',
            ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
        ],
    },
};

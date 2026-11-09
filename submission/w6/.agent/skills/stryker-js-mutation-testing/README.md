# stryker-js-mutation-testing (v3)

Skill cho Claude Code: chạy StrykerJS, đọc kết quả, kill survivor bằng assertion dựa trên spec, báo cáo theo template.

## Cài đặt

Copy cả thư mục (giữ tên `stryker-js-mutation-testing`) vào một trong hai chỗ:

- Mọi project: `~/.claude/skills/stryker-js-mutation-testing/` (Windows: `%USERPROFILE%\.claude\skills\...`).
- Một project: `<project>/.claude/skills/stryker-js-mutation-testing/`.

Trong repo seminar T10, bản nguồn của skill nằm ở `submission/w6/.agent/skills/stryker-js-mutation-testing/`. Claude Code không tự đọc thư mục `.agent/skills/`, nên phải copy thư mục này sang một trong hai chỗ trên.

Kiểm tra: mở Claude Code trong project, gõ `/skills`; hoặc gọi trực tiếp `/stryker-js-mutation-testing ...`.

## Lệnh cần cho phép

Skill chạy mọi lệnh từ thư mục gốc project. Cho phép các tool sau, hoặc duyệt từng lệnh khi Claude hỏi:

```
Skill Read Write Edit Glob Grep "Bash(npx:*)" "Bash(npm:*)" "Bash(node:*)" "Bash(git:*)" "Bash(mkdir:*)" "Bash(cp:*)" "Bash(ls:*)" "Bash(cat:*)" "Bash(tee:*)"
```

`npm` chỉ cần khi project chưa cài Stryker. Lệnh `git` dùng để ghi commit và trạng thái.

## Prompt mẫu

Tương tác:

```
/stryker-js-mutation-testing Chạy mutation testing cho src/utils/price.js với bộ test hiện có, kill survivor quan trọng nhất bằng 1 test, chạy lại và báo cáo theo template. Spec ở docs/requirements.md.
```

Không tương tác (CI hoặc script). Skill tự chọn phạm vi nhỏ và ghi lại các giả định:

```sh
claude -p "/stryker-js-mutation-testing <yêu cầu như trên>" --model sonnet --allowedTools Skill Read Write Edit Glob Grep "Bash(npx:*)" "Bash(npm:*)" "Bash(node:*)" "Bash(git:*)" "Bash(mkdir:*)" "Bash(cp:*)" "Bash(ls:*)" "Bash(cat:*)" "Bash(tee:*)"
```

## Nội dung

- `SKILL.md`: quy trình chính, chế độ kill một survivor, cách chạy nhanh.
- `references/`: status và metrics, traps (ví dụ quan sát được), `count.js`, mẫu báo cáo, runner (Jest đã kiểm; Vitest, Mocha, TypeScript checker chưa chạy), thời gian và incremental.

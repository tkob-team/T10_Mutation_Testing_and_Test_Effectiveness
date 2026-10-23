# Auth Guide Reproduction Evidence

**Task:** S4-D02. **Owner:** Thái Hòa. **Executor:** OpenAI Codex AI Agent.

Đầu vào là [guide-tested.md](guide-tested.md), chụp nguyên văn từ S4-A03 nhận trong merge 4c5db59; hash/version và adaptations có trong [result manifest](result.json). Không sửa guide của tác giả để vượt blocker trong lượt này.

- [Commands và UTC timestamps/exit codes](commands.json).
- [Install](install.log), [88-test integration](integration.log), [26-test Auth](auth-tests.log), [dry run](auth-dry.log).
- Baseline mutation: [HTML](auth-mutation.html), [JSON](auth-mutation.json), [console](auth-mutation.log).
- Advanced failure: [Missing script: test:auth:manual](manual-command.log).
- [Runner](reproduce.py): tạo disposable local clone, checkout frozen source và chạy tuần tự tới blocker; không dùng supplementary setup để lấp bước thiếu.

Auth baseline khớp expected counts: 125 mutants, 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage, 8 RuntimeError. Exit 0 không có nghĩa mọi mutant chạy không lỗi. Protected runtime files không đổi trước/sau.

Reproduction dừng ở Advanced Usage 2; fresh AI request và manual/AI guide steps sau đó chưa chạy. [Issue handoff](../../../../../materials/s4/Guide_Reproduction_Thai_Hoa.md) ghi feedback và yêu cầu retest. Hòa tự chạy, author acceptance và feedback receipt vẫn Pending.

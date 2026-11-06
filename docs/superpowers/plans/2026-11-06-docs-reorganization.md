# Documentation Reorganization Implementation Plan

> For agentic workers: execute this plan inline with superpowers:executing-plans. User approval covers the design and execution in this checkout. Do not spawn subagents, use computer use, stage files or commit.

**Commit authorization update:** Sau khi triển khai và dừng để review, người dùng yêu cầu commit checkpoint trong chat. Điều này thay yêu cầu tạm dừng stage/commit bên dưới cho lượt commit hiện tại. Không push.

**Goal:** Mỗi deliverable có một bản nguồn đang làm; repo được điều hướng theo đầu ra thay cho stage.

**Architecture:** Chuyển tài liệu đang làm về requirements, docs, activity và ai-audit. Evidence và snapshots có vai trò lịch sử được giữ riêng và kiểm tra bằng SHA-256.

**Tech Stack:** Markdown, Git read-only commands, Python standard library và filesystem local.

**Spec:** `docs/superpowers/specs/2026-11-06-docs-reorganization-design.md`, được người dùng duyệt trong chat trước khi thực thi.

## Original Execution Constraints

- Thực hiện bước 1. Không audit hoặc sửa source code, không chạy thực nghiệm mới, không chọn SUT/platform activity mới.
- Không stage, commit, push hoặc thay đổi Git refs. HEAD và index giữ nguyên.
- Không spawn subagents hoặc dùng computer use.
- Giữ nguyên 38 file submission, 6 mẫu AI gốc và raw evidence.
- Giữ tracker, ownership và các xác nhận cá nhân. Không dựng reflection, chữ ký hoặc kết quả thật.
- Nguồn giảng viên giữ nguyên. Quyết định mới của người dùng được ghi riêng, gồm bỏ giới hạn số slides.
- Không dùng middle dot, em dash hoặc ký hiệu trang trí trong tài liệu mới hoặc tài liệu đang chỉnh.

## Review Focus

- Mỗi file tracked ban đầu có đích duy nhất hoặc được giữ nguyên, không collision và không mất bytes ngoài thay đổi tài liệu được nêu.
- Các bản lấy từ snapshot có nguồn rõ; snapshot không bị chỉnh.
- Links trong tài liệu thao tác dẫn đến vị trí mới; evidence lịch sử giữ nội dung và có map để tra đường dẫn.
- Stage xuất hiện trong nguồn gốc hoặc artifact IDs lịch sử không trở thành workflow hiện hành.
- Khôi phục activity cũ không được mô tả thành pilot mới hoặc platform ranking đã xây.

## Task 1: Inventory and Migration

**Consumes:** Spec và 780 paths tracked tại HEAD `f419962`.

**Produces:** Cây tài liệu theo spec và `evidence/coordination/Repository_Migration_Manifest.json` chứa old path, new path, action, SHA-256 trước/sau và nguồn khôi phục.

- [x] Lưu inventory, hashes và bản sao phục hồi trong temporary directory local.
- [x] Tính toàn bộ mapping, kiểm tra containment, collision và trạng thái ban đầu trước khi move.
- [x] Di chuyển các nhóm tài liệu, sao bản nguồn từ snapshot và khôi phục 15 activity support files theo spec.
- [x] Kiểm tra mọi bytes được bảo toàn trước khi sửa nội dung tài liệu đang làm.

## Task 2: Working Documents and Routing

**Consumes:** Path map từ Task 1.

**Produces:** README, AGENTS, CONTEXT, requirements consolidated, checklist và links hoạt động.

- [x] Viết lại routing theo deliverables, một nguồn cho mỗi tài liệu; cập nhật workspace root AGENTS.
- [x] Tạo checklist nộp và thuyết trình có status trung thực, REQ IDs, nguồn và phần còn thiếu.
- [x] Cập nhật paths và nhãn vận hành trong tài liệu đang làm; giữ hồ sơ lịch sử nguyên bytes.
- [x] Ghi usage AI cho lần tái cấu trúc; verdict của người dùng và nghiệm thu nội dung vẫn riêng.

## Task 3: Verification and Handoff

**Consumes:** Manifest, checklist và toàn bộ working tree sau chỉnh sửa.

**Produces:** Kết quả validation trong `evidence/coordination/Repository_Migration_Validation.json` và diff chưa commit.

- [x] Kiểm tra full path accounting, hashes, recovered files, snapshot preservation và unchanged Git index/HEAD.
- [x] Kiểm tra local links của active docs, các paths code trong hướng dẫn và ký tự bị cấm.
- [x] Tự review diff/routing riêng một lượt, sửa vấn đề trong scope và kiểm tra lại.
- [x] Dừng trước stage/commit, báo các đầu ra chính và những phần chưa audit.

## Execution Ledger

- Ruling: triển khai tại checkout hiện tại theo yêu cầu người dùng, không tạo worktree hoặc commit; việc review dựa trên working tree và manifest.
- Ruling: tài liệu và di dời được kiểm chứng bằng hashes, file accounting và link checks; không thêm unit tests cho thay đổi docs.
- Ruling: tự review vì người dùng chưa cho phép subagents; không tự nhận là independent review.
- Pre-flight: Task 2 dùng map của Task 1; Task 3 kiểm cả bytes đã bảo toàn và thay đổi đã khai báo. Không dùng kiểm tra nguyên bytes cho tài liệu thao tác đã được phép chỉnh nội dung.

- Task 1: complete. 780 original files accounted for, 729 moves, 32 source copies and 15 recovered files; all 827 destination hashes matched before document edits.
- Task 2: complete. Updated routing, requirements and checklist; current-source local link check found 187 links across 33 documents and zero missing paths.
- Task 3: validation and final self-review are recorded in Repository_Migration_Validation.json. No source tests, mutation, audience pilot, native slide rendering or media access checks were run.
- Ruling: old stage names and paths remain only as provenance in instructor sources, raw evidence, snapshots and historical record payloads; current routing uses deliverables.
- Ruling: workbook, signed PDF copies and slide transcript remain byte-identical to their source; exports need regeneration after later content changes.
- Git handoff: leave the entire change unstaged and uncommitted as requested. Do not run cleanup or restore automatically.
- Final self-review: phát hiện acceptance table trong seminar proposal còn giới hạn 15 slides; đã thay bằng quyết định hiện hành và thêm kiểm tra stale routing/count vào validation.
- Commit checkpoint: người dùng đã yêu cầu commit sau review; cập nhật routing hiện hành và kiểm tra lại trước khi stage. Workspace AGENTS thuộc vùng ignore của repo cha nên chỉ giữ local.

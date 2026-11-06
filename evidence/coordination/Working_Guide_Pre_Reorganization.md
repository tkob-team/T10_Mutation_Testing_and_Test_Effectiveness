# Team Working Guide

## Start a Task

1. Đọc AGENTS → CONTEXT → requirements/task được giao.
2. Tra Task ID trong [Task Output Map](Task_Output_Map.md) hoặc Required Output/Notes của Team Sheet. Paths tính từ repo root; `SUT/` là repo EShop được dẫn trong CONTEXT.
3. Nếu output chưa có, copy template khi bắt đầu, tạo folder đích nếu cần và điền Member/Task IDs/Domain. Nếu file đã có, cập nhật section được giao; giữ TEMPLATE làm mẫu chung.
4. Giao Markdown, code commit và evidence liên quan để review; chỉ task assembly hợp nhất contributions của nhiều người.

## Stage Outputs

Preparation–S2 do **Thái Hòa** thực hiện. Task IDs ở các stage này chia theo nội dung, không đại diện cho ba người nhận. Teammate bắt đầu nhận việc từ **S3**.

| Stage | Destination / Contract |
|---|---|
| Preparation | Requirements/README và quy ước bàn giao; agenda `docs/s2/Meeting_Agenda.md` |
| S1 | Cập nhật surveys `proposal/s1/Traditional_Mutation_Testing_Tools.md`, `AI_Augmented_Mutation_Testing_Tools.md` và `Tool_Survey_Proposal.md`; comparison/sources đặt trong tài liệu sử dụng |
| S2 | `docs/s2/Meeting_Agenda.md` và một `Scope_and_Decisions.md`; dùng [Task Notes](templates/Task_Notes_TEMPLATE.md) khi tạo; chia sections **Scope**, **Instructor Questions**, **Decisions & Actions** |
| S3 | Notes `research/s3/`; logs/manifest/runs `experiments/s3/`; code/tests/config ở SUT |
| S4 | Guide/report/demo contributions `materials/s4/`; comparison chung `experiments/s4/` |
| S5 | Activity/slides/pilot/rehearsal/readiness `materials/s5/` |
| S6 | Session notes và activity submissions thật `materials/s6/` |
| S7 | Feedback/actions cá nhân và bản tổng hợp `materials/s7/` |
| S8 | Peer/contribution notes `materials/s8/`; AI forms chính thức `ai-audit/s8/` |
| All | Một `ai-audit/AI_Record_<Member>.md` mỗi người khi có usage; từng artifact ghi Stage/Task ID |
| Final | `final/` chỉ bản đã review; lưu link nộp và receipt thật khi bàn giao |

S2 Scope ghi spec/commit, cases và expected results của cả ba domains, sai khác code/spec và baseline/seams đề xuất. Instructor Questions ghi phương án/ảnh hưởng. Decisions & Actions ghi verdict, evidence, owner và việc cần làm trước S3; mục chưa xác nhận giữ Proposed/Pending. S3 nhận scope từ file chung này.

`research/s1/reference/` giữ generated references cũ. Sửa sau feedback ở file stage gốc để giữ một nguồn; chỉ bản đã review đưa vào final. Research S3 dùng cho report S4 vẫn ở S3.

## Format & Handoff

- Markdown trong repo là bản nguồn cho notes/written contributions. Google Docs có thể dùng để cộng tác; bàn giao phải sync về file đích, ghi link/version.
- Tests/config/fixtures ở SUT; dẫn commit/run. Reports HTML/JSON, screenshots và logs ở stage thực nghiệm với `runs/<Member>/<Run_ID>/`.
- Slides contributions là outline/speaker notes Markdown; task assembly tạo PPTX chung từ template GV. Template chưa có ghi Pending.
- Video là MP4 hoặc link Drive/Moodle có access. PDFs/chữ ký chỉ tạo từ dữ liệu thật.
- Templates nằm cạnh outputs theo stage. [Task Notes](templates/Task_Notes_TEMPLATE.md) dùng chung cho meeting, verification, pilot/rehearsal/readiness, session/actions và đóng gói; thêm checklist từ task.

## AI Audit

Copy [Individual AI Record](../ai-audit/AI_Record_TEMPLATE.md) thành `ai-audit/AI_Record_<Member>.md` khi cần. Một phiếu xuyên S1–S8; mỗi artifact có owner, Stage/Task ID, raw prompt/output, verdict, sources, sửa đổi và verification. Transcript dài đặt `ai-audit/evidence/sN/<Member>/` khi có; tái sử dụng artifact thì dẫn cùng ID.

Leader tổng hợp AI-02/03/04 ở `ai-audit/s8/` từ phiếu cá nhân và [original forms](../ai-audit/originals/). Phiếu là inputs, không thay forms chính thức. Reflection do thành viên viết từ trải nghiệm; AI-03/chữ ký của từng người thực hiện ở bản nộp. Không tự suy ra form nhóm đáp ứng các trường cá nhân.

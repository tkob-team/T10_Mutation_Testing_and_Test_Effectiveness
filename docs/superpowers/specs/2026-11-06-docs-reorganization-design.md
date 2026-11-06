# Documentation Repository Review and Reorganization Design

**Status:** Approved by the user on 2026-11-06. Inspection findings and proposed-source tables below describe the pre-migration review. Execution is tracked in the [implementation plan](../plans/2026-11-06-docs-reorganization.md).

**Scope:** Bước 1 theo yêu cầu người dùng trong chat ngày 2026-11-06.

**Inspected revision:** `f41996275883ce3f9ca574ce6b83aabf6e861085`.

## Intent

Tổ chức repo theo tài liệu cần nộp và cần dùng khi thuyết trình. Mỗi tài liệu có một bản nguồn đang chỉnh sửa. Bỏ workflow, thư mục và quy tắc giao việc theo stage. Khi cần hiệu chỉnh, sửa trực tiếp bản nguồn đó.

Raw evidence, hồ sơ đóng góp và snapshots đóng gói có vai trò lịch sử. Chúng được phân biệt rõ với bản nguồn đang làm. Có snapshot không đồng nghĩa đã nộp thành công, đã được review hoặc đã được giảng viên chấp nhận.

## Confirmed Scope

- Session này thực hiện bước 1: rà đầu ra, tổ chức lại docs và cập nhật chỉ dẫn làm việc.
- Audit môi trường, tests, baseline và thực nghiệm của repo source thuộc bước 2.
- Chọn SUT cho activity và xây hệ thống submission/ranking thuộc session activity sau.
- Viết kỹ nội dung và dựng lại slides thuộc bước cuối của kế hoạch chung.
- Người dùng đã bỏ giới hạn số slides cho bản làm việc mới. Chọn số lượng phù hợp nội dung và thời lượng.
- Quyết định trên là chỉ dẫn hiện hành của người dùng, không tự ghi thành thông báo mới của giảng viên.
- Không spawn subagent hoặc dùng computer use khi chưa được người dùng cho phép.
- Không thay tracker, phân công, reflection, chữ ký hoặc xác nhận review của thành viên.
- Không đặt lịch hoặc estimate cho roadmap.

## Inspection Method and Limits

Đã liệt kê toàn bộ file được Git theo dõi, phân nhóm theo đường dẫn và loại file; so sánh Markdown trùng nội dung; đọc requirements, agent docs, guides và các tài liệu chính; đối chiếu các bản guide/report/proposal; rà đường dẫn Markdown local; tra Git history cho phần bị gỡ khi đóng gói.

Chưa chạy code, test, mutation hoặc activity. Chưa kiểm tra hiển thị PowerPoint, chữ ký trong PDF, nội dung workbook, quyền xem video, Moodle hoặc tình trạng nộp. Chưa đọc và xác minh từng raw log hay script trong evidence. Kết luận dưới đây là kiểm kê cấu trúc và lựa chọn nguồn, không phải nghiệm thu nội dung hoặc thực nghiệm.

## Current Inventory

| Location | Tracked files | Observation |
|---|---:|---|
| Root documents | 3 | README, AGENTS và CONTEXT |
| `docs/` | 9 | Requirements, workflow theo stage, demo script và summary |
| `materials/` | 27 | Bản ghép, contribution, verification và templates |
| `proposal/` | 10 | Bản ngắn, bản chi tiết và exports theo stage |
| `research/` | 8 | Notes cá nhân và generated references |
| `experiments/` | 659 | Raw reports, logs, source snapshots, scripts và các records thực nghiệm |
| `ai-audit/` | 25 | Records cá nhân, mẫu gốc và evidence AI |
| `skills/` | 1 | ZIP skill hỗ trợ |
| `submission/` | 38 | Snapshots w3 và w6 |
| Total | 780 | Gồm 155 Markdown, 224 JSON, 172 logs, 69 HTML |

`draft/` và `state/` hiện rỗng. Không có `.local/`, `TASKS.md` hoặc `T10_Seminar_Execution_Flow.md` tại workspace root dù routing hiện hành còn nhắc đến.

## Findings

### Multiple Working Sources

- Guide ở `materials/s4/User_Guide.md` có 765 dòng, ghép nội dung ba domain và ghi chú sửa của tác giả. Guide ở `submission/w6/User_Guide.md` có 334 dòng, hướng dẫn workshop theo một flow riêng. Hai bản có mục đích và phạm vi khác nhau, không phải bản sao nguyên văn.
- Report ở `materials/s4/Seminar_Report.md` có 998 dòng; bản w6 có 985 dòng. Cấu trúc chính tương ứng nhưng nội dung đã thay đổi, nên phải giữ nguồn cũ trước khi chọn bản làm việc.
- `proposal/s1/Tool_Survey_Proposal.md` là proposal ngắn 41 dòng. File cùng tên ở `proposal/s2/` là survey chi tiết 231 dòng. Cần đặt tên theo vai trò để không nhầm hai đầu ra.
- Proposal chi tiết và tool survey ở `proposal/s2/` trùng Markdown với các bản tương ứng trong `submission/w3/` sau khi chuẩn hóa newline.
- Các contribution cá nhân chứa thông tin riêng về domain, handoff và provenance. Chuyển chúng thành hồ sơ tham chiếu sẽ giữ nguồn mà không tiếp tục duy trì nhiều bản guide/report đang chỉnh.

### Recoverable Activity Support

Commit `f419962` gỡ `Activity_Support/` cùng phần `draft/` khỏi cây hiện tại khi chuẩn bị submission. Bản cha `f6c69f6afe1ab8d86e6538a352e98cdec154808c` vẫn có đủ 15 file activity support:

- `Activity_Facilitator_Guide.md`, gồm hướng dẫn điều phối và answer key K1 đến K5.
- `Activity_Sandbox/candidate.cjs`, `reference.cjs` và `run-activity.cjs`.
- 11 file verification, gồm README, config và các kết quả đã lưu.

`verification/summary.json` ghi executor là Codex AI Agent: reference 5/5 target kills, weak 0/5, candidate rỗng bị từ chối. Record cũng ghi chưa có audience pilot hoặc member rehearsal. Đây là evidence lịch sử, chưa được chạy lại trong session hiện tại.

Thiết kế này dùng workshop starter cũ. Chỉ khôi phục để có đầy đủ nguồn và bàn giao; không mặc định nó là SUT hoặc hệ thống ranking được chọn cho activity mới.

### Routing and Links

- README, AGENTS, CONTEXT, Working Guide và Task Output Map đang dẫn người làm theo stage và tạo contributions riêng.
- CONTEXT chứa cả quyết định chung và trạng thái lịch sử. Một số câu lỗi hoặc Pending cần đối chiếu ở bước audit source, không chuyển thành kết luận hiện tại.
- Scan heuristic xét 644 local Markdown link occurrences và đánh dấu 55 occurrences ở 6 file. Một occurrence là chuỗi trong transcript bị parser nhận nhầm; các occurrences còn lại cần phân loại giữa link thao tác thật và bản sao evidence lịch sử.
- AI Record của Thái Hòa còn dẫn tới `draft/User_Guide.md` và `draft/Seminar_Report.md`, hiện không tồn tại.
- Một số `guide-tested.md` nằm trong run evidence giữ relative links của tài liệu gốc; copy sang nơi khác khiến chúng không còn resolve theo vị trí hiện tại.
- AI-03 Markdown của một thành viên trong snapshot w6 có relative links không resolve từ thư mục đóng gói. Snapshot giữ nguyên; sửa ở bản làm việc khi tách ra.
- Report w6 có links GitHub tại commit cụ thể tới `draft/` và `Activity_Support/`. Git history local xác nhận các nguồn đó từng tồn tại. Chưa kiểm tra quyền truy cập remote; không gọi các links này là hỏng chỉ vì cây hiện tại thiếu file.

### Requirements Interpretation

- Nguồn giảng viên vẫn chứa stage, deadline và mẫu gốc. Giữ nguyên nguồn; bỏ stage khỏi workflow tổ chức repo của nhóm.
- Master Guide có tip giữ slides tối đa 15 và checklist ghi 15 slides. Bản làm việc mới áp dụng quyết định không giới hạn số slides của người dùng, ghi provenance riêng.
- Guide w6 có headings English nhưng phần hướng dẫn chủ yếu bằng tiếng Việt. Checklist cần giữ vấn đề English guide để xử lý ở lượt hoàn thiện nội dung.
- S1/S2 đã hoàn tất theo xác nhận được lưu trong CONTEXT. Việc chưa tìm thấy file `Scope_and_Decisions.md` không hủy xác nhận đó; chỉ ghi thiếu record cụ thể trong bộ docs hiện tại.

## Approaches

Hướng người dùng đã chọn là tổ chức theo deliverables, chỉnh trực tiếp một bản nguồn và giữ lịch sử qua Git/evidence. Tên thư mục cụ thể và lựa chọn bản nguồn bên dưới là đề xuất để review.

- Giữ cây stage và thêm index sẽ vẫn để nhiều nguồn đang làm song song, không đáp ứng yêu cầu.
- Chỉ dùng `submission/w6/` làm workspace sẽ trộn snapshot với bản đang sửa và bỏ qua contribution/evidence riêng.
- Đề xuất di chuyển theo deliverables, giữ snapshots nguyên trạng và đưa hồ sơ tham chiếu vào `evidence/`. Cách này đáp ứng hướng đã chọn và giữ khả năng truy nguồn.

## Proposed Layout

```text
README.md
AGENTS.md
CONTEXT.md
requirements/
docs/
  Deliverables_Checklist.md
  Tool_Survey_Proposal.md
  Tool_Survey.md
  Seminar_Proposal.md
  User_Guide.md
  Seminar_Report.md
  Demo_Script.md
  Demo_Video_Link.md
  slides/
activity/
ai-audit/
evidence/
submission/
```

Không tạo thêm `draft/`, `final/`, `s1/` đến `s8/` cho tài liệu đang làm. Không thêm file rỗng chỉ để tạo cảm giác đủ đầu ra. Checklist ghi Missing hoặc Pending cho phần chưa có.

## Proposed Working Sources

| Deliverable | Source selected for migration | Working destination | Note |
|---|---|---|---|
| Checklist nộp và thuyết trình | Requirements và các quyết định hiện hành trong chat | `docs/Deliverables_Checklist.md` | Tạo mới, tách Có file khỏi Đã kiểm chứng |
| Proposal ngắn | `proposal/s1/Tool_Survey_Proposal.md` | `docs/Tool_Survey_Proposal.md` | Bỏ nhãn stage; giữ việc còn cần review nội dung |
| Survey chi tiết | `proposal/s2/Tool_Survey_Proposal.md` và PDF tương ứng | `docs/Tool_Survey.md`, `docs/Tool_Survey.pdf` | Bản ngắn và survey chi tiết có vai trò khác nhau |
| Seminar proposal | `proposal/s2/T10_Seminar_Proposal.md` và PDF tương ứng | `docs/Seminar_Proposal.md`, `docs/Seminar_Proposal.pdf` | Giữ như hồ sơ scope đã đề xuất; không dựng approval |
| User guide | `submission/w6/User_Guide.md` | `docs/User_Guide.md` | Seed theo workshop flow; bản ghép ba domain giữ để tham khảo |
| Report | `submission/w6/Seminar_Report.md` | `docs/Seminar_Report.md` | Seed bản đóng gói; giữ bản assembly cũ để đối chiếu |
| Demo script | `docs/Demo_Script.md` | Giữ nguyên | Cập nhật links nếu cần; không chạy demo trong bước 1 |
| Video link | `submission/w6/Demo_Video_Link.md` | `docs/Demo_Video_Link.md` | Có link, access và nội dung chưa kiểm tra |
| Slides | Bộ PPTX, PDF và Markdown trong w6 | `docs/slides/Seminar_Slides.pptx`, `Seminar_Slides.pdf`, `Slide_Transcript.md` | PPTX là file dựng; Markdown là transcript tham chiếu, không gọi là nguồn dựng PPTX |
| Activity worksheet | `submission/w6/Activity_Worksheet.md` | `activity/Activity_Worksheet.md` | Thiết kế hiện có, cần bàn lại trong session activity |
| Facilitator guide và answer key | `f6c69f6:Activity_Support/Activity_Facilitator_Guide.md` | `activity/Facilitator_Guide.md` | Khôi phục, ghi rõ thiết kế cũ và verification lịch sử |
| Sandbox activity cũ | `f6c69f6:Activity_Support/Activity_Sandbox/` | `evidence/activity/previous-sandbox/` | Giữ 14 file nguyên bytes; không phát triển platform mới ở đây |
| AI records | `ai-audit/AI_Record_<Member>.md` | Giữ tại `ai-audit/` | Bỏ hướng dẫn workflow theo stage; giữ artifact IDs lịch sử và verdict thật |
| AI forms và logs đã điền | `submission/w6/AI_Usage_Declaration/` | `ai-audit/members/` | Giữ originals riêng; PDF là bản export có phiên bản, chỉnh Markdown nguồn khi có input thật |
| Contribution workbook | Workbook trong w6 | `docs/Contribution_Summary.xlsx` | Giữ nguyên bytes, formulas và grey cells; chưa nghiệm thu nội dung |
| Git log snapshot | `submission/w6/Git_Commit_Log.md` | `evidence/coordination/Git_Commit_Log_2026-10-23.md` | Hồ sơ lịch sử, không dùng Git author thay xác nhận đóng góp |

File lấy từ `submission/` được sao ra làm bản nguồn. Snapshot vẫn nguyên trạng. Các PDF/PPTX được kiểm kê theo vai trò nguồn hoặc export, không tiếp tục chỉnh hai nội dung độc lập cùng tên.

## Remaining File Routing

| Current group | Destination or treatment |
|---|---|
| Ba nguồn giảng viên trong `docs/requirements/` | Chuyển nguyên bytes sang `requirements/` |
| `Seminar_Requirements_Consolidated.md` | Chuyển sang `requirements/`, bỏ cột/routing theo stage và ghi quyết định mới có nguồn |
| `docs/Working_Guide.md` | Hợp nhất quy tắc cần dùng vào README và AGENTS; giữ nguồn cũ trong `evidence/coordination/` |
| `docs/Task_Output_Map.md` | Thay vai trò bằng checklist theo deliverables; giữ bản cũ trong `evidence/coordination/` |
| `docs/Stage3-Sumary.md` | `evidence/experiments/Experiment_Summary_2026-10-23.md` |
| `experiments/s3/` | `evidence/experiments/domain-runs/`, giữ cây bundle nội bộ |
| `experiments/s4/` | `evidence/experiments/integration-and-reproduction/`, giữ cây bundle nội bộ |
| `materials/s4/*Contribution*`, reproduction và verification records | `evidence/contributions/` và `evidence/verification/` |
| Bản ghép guide/report trong `materials/s4/` | `evidence/document-history/User_Guide_Assembly.md` và `Seminar_Report_Assembly.md` |
| Templates theo stage trong docs/materials/research/experiments | `evidence/previous-workflow/templates/`, không tiếp tục yêu cầu tạo contribution mới |
| Research notes của ba thành viên | `evidence/research/` |
| Traditional và AI tool surveys trong `proposal/s1/` | `evidence/research/tool-surveys/`, giữ Markdown và workbook tham chiếu |
| Proposal ngắn cũ `proposal/s1/T10_Seminar_Proposal.md` | `evidence/document-history/Seminar_Proposal_Early.md` |
| Generated references `research/s1/reference/` | `evidence/research/generated-references/`, giữ nhãn chỉ tham khảo |
| `ai-audit/evidence/s3/`, `ai-audit/evidence/s4/` | `ai-audit/evidence/research-and-experiments/`, `ai-audit/evidence/documentation/` |
| `ai-audit/originals/` | Giữ nguyên vị trí và bytes |
| ZIP skill trong `skills/` | `evidence/tools/` |
| `submission/w3/`, `submission/w6/` | Giữ nguyên toàn bộ paths và bytes |
| Empty `draft/`, `state/` | Gỡ sau khi xác nhận vẫn rỗng |

Tên run và artifact IDs lịch sử có thể chứa S3/S4. Giữ chúng để truy nguồn. Không dùng chúng để điều hướng hoặc chia việc mới. Source snapshot, prompts, logs, JSON/HTML reports, signatures và raw commands không bị sửa nội dung để hợp cây mới.

Các link tương đối trong tài liệu thao tác được cập nhật theo map. Link hoặc paths đóng băng trong raw evidence được giải thích qua migration manifest, không rewrite hàng loạt. Scripts trong evidence là snapshots lịch sử; khả năng chạy lại từ đường dẫn mới thuộc audit source sau, không tự xác nhận trong bước 1.

## Deliverables Coverage

| Output or evidence | Inspection status | Follow-up |
|---|---|---|
| Tool proposal, survey, seminar proposal | Có nhiều nguồn, đã phân biệt vai trò | Di chuyển theo bảng nguồn |
| User guide, report, slides, video link | Có trong w6; còn bản assembly khác | Chọn một bản đang làm, rà nội dung kỹ ở bước cuối |
| Worksheet, answer key, runner | Worksheet hiện có; support khôi phục được từ Git | Khôi phục nguồn cũ, bàn hệ thống mới ở session activity |
| AI-02/03/04 | Có Markdown và PDF trong snapshot | Tách nguồn; không suy verdict hoặc chữ ký đã được kiểm tra |
| Contribution | Có workbook và records cá nhân | Giữ nguyên nội dung; tracker vẫn là nguồn assignee/status |
| Baseline và manual/AI comparison | Có manifest, reports, logs | Bước 2 kiểm tra kỹ thuật và tái lập |
| Demo coverage matrix | Không tìm thấy file hợp nhất riêng trong cây hiện tại | Ghi Missing trong checklist, chưa tự dựng coverage đã đạt |
| Instructor scope/rehearsal records | Context xác nhận S1/S2; chưa tìm thấy record cụ thể tương ứng | Giữ xác nhận đã có, tìm evidence thật khi làm readiness |
| Pilot và rehearsal audience thật | Chưa tìm thấy record trong cây hiện tại; activity summary ghi chưa có | Pending, không suy từ Agent runs |
| Audience feedback và action items | Chưa tìm thấy bản tổng hợp thực tế | Pending sau seminar |
| Hai peer reviews | Chỉ có template contribution | Missing inputs, chờ đúng nhóm đối tác và review thật |
| Final Reflection riêng | Chưa tìm thấy file riêng; AI-04 có trong snapshot | Giữ việc xác định tách/gộp, không tự viết trải nghiệm |
| Moodle sharing, receipt, access | Chưa xác minh | Ghi cần evidence, không gán Done |

## Migration Checks

- Lập manifest old path, new path, action và SHA-256 trước khi di chuyển. Mọi file tracked ban đầu có đích hoặc cách giữ được ghi rõ; kiểm tra collision trước khi move.
- Giữ 38 file trong submission và 6 AI originals nguyên bytes.
- Giữ raw reports, logs, source snapshots và 14 file sandbox cũ nguyên bytes.
- Kiểm tra root/status đúng repo ngay trước thao tác Git; giữ thay đổi ngoài scope.
- Chỉ sửa routing tối thiểu trong workspace root AGENTS nếu đường dẫn cần cập nhật. Không đụng source repos hoặc tracker.
- Kiểm tra README, AGENTS, CONTEXT và checklist chỉ dẫn đến bản nguồn hiện tại. Không còn yêu cầu tạo file theo stage.
- Kiểm tra local links trong tài liệu đang làm. Phân biệt links thật với text/code/transcript; ghi ngoại lệ lịch sử trong manifest.
- Không để trùng đích, mất file hoặc hai bản guide/report cùng được gọi là đang làm.
- Kiểm tra tài liệu viết mới không có middle dot, em dash hoặc ký hiệu trang trí.
- Báo riêng việc đã tổ chức lại, phần chưa kiểm chứng và phần chuyển sang session sau.

## Review Boundary

Người dùng đã duyệt thiết kế và yêu cầu thực thi, dừng trước commit. Việc di dời, hiệu chỉnh và kiểm tra được ghi trong implementation plan, migration manifest và validation record. Các số kiểm kê trong phần review giữ mốc trước khi di dời, không phải progress tracker hiện tại.

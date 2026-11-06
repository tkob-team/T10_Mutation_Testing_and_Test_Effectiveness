# Task Notes

**Document Role:** Report, metrics and source verification record.  
**Stage:** S4  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S4-F02  
**Domain / Section:** Integrated report and joint comparison  
**Evidence Status:** Verification findings recorded; final machine check is retained in the linked validation record. Human acceptance Pending.

## Assigned Work & Inputs

Đối chiếu [Seminar Report](Seminar_Report.md) và [Overall Comparison](../../experiments/s4/Overall_Comparison.md) với raw reports, frozen inputs, nguồn lý thuyết và attribution. Việc này kiểm tra tính nhất quán kỹ thuật của docs, không xác nhận trải nghiệm tự chạy của thành viên hoặc kết quả seminar thực tế.

Đầu vào chính là [S4 run evidence](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/README.md), các nguồn S3 của ba domain, requirements REQ-03/07-20/31 và bốn templates giữ nguyên.

## Record

| Issue / Action | Observation / Result | Evidence | Resolution / Next Action |
|---|---|---|---|
| VF-01: Auth comparison bị ghi thiếu trong report cũ | F03/G03/H03 hiện có reports, source snapshots và reviewed candidate | [H03](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md) | Bổ sung Auth results, oracle labels, contribution và giới hạn; không gán source Agent thành member self-run |
| VF-02: Model revision được nêu quá cụ thể | Report cũ ghi `gpt-sol-6-1`, trong khi provenance chung không xác lập exact serving revision cho mọi run | [Hòa log](../../experiments/s3/Experiment_Log_Thai_Hoa.md) | Dùng OpenAI Codex và giới hạn revision đã biết; giữ nguyên historical raw outputs |
| VF-03: Chưa có score chung từ execution chung | S3 domain reports dùng selections riêng; cộng counts hoặc trung bình score không chứng minh joint result | [S4 raw reports and summary](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/summary.json) | Chạy ba joint profiles; tính score từ từng report thực tế và tách domain history |
| VF-04: Initial SUT package không parse được | HEAD 69b845a thiếu dấu phẩy; trong lúc chạy, SUT chính nhận external commit 4b28756 sửa lỗi này | [Source postflight](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/source-preservation.json), [recovery record](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/postflight-recovery.json) | Agent không sửa checkout chính. Runner dừng ở final preservation assertion sau ba mutation exit 0; ghi rõ external update, không báo main HEAD giữ nguyên |
| VF-05: Native SQLite worker crashes và phân loại timeout | Raw joint runs có RuntimeError và Timeout; không xem exit 0 là không có lỗi mutant | Console logs và [full state mapping](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/mutant-mapping.md) | Công bố counts và transitions; không quy error-to-Killed hoặc Timeout thành new survivor assertion kills |
| VF-06: Sai số do ghép runtime và test populations | Joint baseline khác historical domain-only results dù production source giống | Config snapshots, 395 signatures và nguồn source trong summary | Giữ ba joint profiles làm comparison riêng; test selection và net-runtime khác là giới hạn diễn giải |
| VF-07: Auth guide advanced setup thiếu bước | S4-A03 được nhận qua merge 4c5db59 trong phiên; Agent chạy qua baseline, rồi gặp Missing script: test:auth:manual | [Reproduction Notes](Guide_Reproduction_Thai_Hoa.md) và actual command log | S4-D02 Partial/Blocked ở advanced setup; cần author fix/retest và Hòa tự chạy |
| VF-08: Personal report handoffs thay đổi trong phiên | B03 đã nhận qua merge 4c5db59; B01 chưa ở stage destination | File inventory trong validation record và [Auth contribution](Report_Contribution_Phuc_Hoang.md) | Report assembly tích hợp evidence và contribution hiện có; vẫn cần domain-author review, không tạo B01 mang tên teammate |
| VF-09: Media và human approval chưa có | Có planned English script và retained backup reports, chưa có clip/link mới | [Demo Contribution](Demo_Contribution_Thai_Hoa.md) | S4-C02 còn recording/human verification; không ghi hoàn tất video từ script |
| VF-10: Draft và stage report có thể lệch | Bản report cũ chứa claims thiếu Auth/combined run | [Report assembler](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/assemble_report.py) | Giữ full scientific structure, cập nhật hai bản cùng nội dung; stage report là nơi handoff, draft là compatibility copy |

## Handoff & Review

- Deliverable and destination: `materials/s4/Verification_Notes_Thai_Hoa.md`.
- Checks performed: [validation result](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/document-validation.json) ghi pass/fail và số checks thực tế; [validator](../../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/validate_docs.py) kiểm link/anchor, template preservation, score/counts từ raw JSON, source preservation và report synchronization.
- Pending / blockers: Hòa và tác giả domain review; author sửa advanced setup trong S4-A03 và retest; Hòa guide-only self-run; demo recording và accessible media link. Sheet/tracker không được tự đổi trạng thái.
- Leader review: Pending.

## Task-Specific Checklist

| Task | Documentation delivered | Remaining completion gate |
|---|---|---|
| S4-A02 | English Coupons guide, commands, expected historical outputs, troubleshooting and sources | Teammate/human reproduction and acceptance |
| S4-B02 | Theory/method/results/discussion Coupons contribution with traceable sources | Member review and report acceptance |
| S4-C02 | English narration, actions, checkpoints, actual-evidence backups and export checklist | Actual clip, human verification and accessible upload |
| S4-D02 | Delivered Auth guide tested by Agent to a concrete missing-script blocker; logs and reports retained | Author fixes advanced setup, retest, Hòa personal self-run |
| S4-E02 | Joint runner, exact input branches/snapshots, HTML/JSON/logs, comparison and assembled report | Domain authors/leader review; no human approval inferred from technical runs |
| S4-F02 | Counts/state/source/link findings and reproducible checks | Hòa/leader accepts findings and closes remaining input gates |

AI artifact: `TH-S4-DOCS-20261023` trong [AI Record](../../ai-audit/AI_Record_Thai_Hoa.md). Không điền thay AI audit verdict, reflection hoặc chữ ký cá nhân.

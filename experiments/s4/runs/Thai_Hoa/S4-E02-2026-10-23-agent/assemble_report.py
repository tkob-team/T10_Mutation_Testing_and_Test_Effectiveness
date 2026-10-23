"""Integrate S4 evidence into the existing scientific report without discarding its sections."""
import json
import hashlib
import re
import subprocess
from pathlib import Path

P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'CONTEXT.md').exists())
SOURCE='91b87c6a4b5b047d592961b62b20b0b57572f642'

def main():
    s=json.loads((P/'summary.json').read_text(encoding='utf-8'))
    inputs=json.loads((P/'existing-inputs.json').read_text(encoding='utf-8'))
    expected=inputs['files']['draft/Seminar_Report.md']
    last=P/'report-generated.json'
    if last.exists(): expected=json.loads(last.read_text())['draftSHA256']
    assert hashlib.sha256((ROOT/'draft/Seminar_Report.md').read_bytes()).hexdigest()==expected,'Draft changed since input snapshot; review concurrent changes before assembly'
    text=subprocess.check_output(['git','show',SOURCE+':draft/Seminar_Report.md'],cwd=ROOT).decode('utf-8')
    changes={
        'Authentication & Users hiện có baseline với 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage và 8 RuntimeError; chưa có dữ liệu manual/AI comparison.':
        'Authentication & Users đã có baseline và manual/reviewed-AI comparison: 60, 83 và 74 Killed; Timeout 27, RuntimeError 8 trong cả ba conditions. Các assertions dựa trên convention được công bố riêng.',
        'Cả ba test suites được chạy chung để kiểm tra integration, còn mutation results được báo theo domain; chưa có combined mutation run cho toàn bộ ba domains.':
        'Các S3 mutation reports được báo theo domain. S4-E02 bổ sung ba runs chung, mỗi run chọn hợp các line ranges và chạy cả ba domains trong hai Jest projects. Kết quả S4 được trình bày riêng tại mục 6.8.',
        '| Auth manual / AI | Chưa có bàn giao completed comparison | Không suy diễn kết quả từ baseline hoặc tutorials |':
        '| Auth manual / AI | Baseline cùng 13 manual tests hoặc 11 reviewed-AI tests, theo F03/G03 source snapshots | Có spec/convention/interpretation labels; rejected test.failing không tham gia |',
        'OpenAI Codex; gpt-sol-6-1': 'OpenAI Codex; exact serving model revision không được record xác nhận',
        '| Authentication & Users | Chưa có AI comparison bàn giao | : | Không dùng tutorial generation làm kết quả EShop |':
        '| Authentication & Users | Claude CLI / claude-sonnet-5-5, theo G03 record | 11 reviewed tests; tổng 37 pass | Loại test.failing mã hóa defect role; lock-expiry là interpretation, một phần oracles là conventions |',
        '| Authentication & Users | Manual | : | : | : | : | : | : | : |':
        '| Authentication & Users | Manual | 39 | 83 | 27 | 4 | 3 | 8 | 94,02% |',
        '| Authentication & Users | AI-assisted | : | : | : | : | : | : | : |':
        '| Authentication & Users | AI-assisted | 37 | 74 | 27 | 13 | 3 | 8 | 86,32% |',
        'Dấu ":" nghĩa là chưa có dữ liệu, không phải zero. Cart và Coupons có cùng mutant populations và source bytes trong từng domain comparison. Tất cả non-new-kill states của các frozen comparisons này giữ nguyên; changes quan sát được là Survived → Killed.':
        'Các S3 conditions khớp mutant populations và normalized source trong từng domain. Cart/Coupons additions chuyển Survived sang Killed. Auth manual chuyển 19 Survived và 4 NoCoverage sang Killed; reviewed AI chuyển 10 Survived và 4 NoCoverage sang Killed [21]. Không suy một state transition giữa các profiles chỉ từ chênh lệch tổng Killed.',
        'Không có combined mutation results cho toàn bộ ba domains. Auth manual/AI comparison cũng chưa có bàn giao. Remaining survivors chưa được chứng minh là equivalent; không có thao tác tự loại equivalent candidates khỏi official score.':
        'Auth F03/G03/H03 đã có trong dataset [21]; joint S4 execution được bổ sung ở mục 6.8 [22]. Các S3 domain results vẫn giữ ý nghĩa lịch sử của riêng test selection tương ứng. Remaining survivors chưa được chứng minh là equivalent; không tự loại candidates khỏi official score.',
        '| RQ2 : Manual và AI additions phát hiện gì? | Cart thêm 23 và 13 kills, intersection 13; Coupons initial variants cùng thêm 2 kills | Không cân bằng test breadth; Coupons cùng context; Auth chưa đủ comparison |':
        '| RQ2 : Manual và AI additions phát hiện gì? | S3 Cart thêm 23/13 kills; Coupons 2/2; Auth 23/14 trên Survived/NoCoverage, intersection Auth 13 | Budgets theo domain khác nhau; Coupons cùng context; Auth có convention và interpretation oracles |',
        'Auth comparison chưa hoàn chỉnh cũng giới hạn khả năng tổng kết cho toàn bộ phạm vi ban đầu.':
        'Joint S4 execution bổ sung ba domains, nhưng chưa có repeated statistical experiment hoặc controlled generation protocol.',
        'Auth đã có baseline và Agent reproduction, chưa có đủ manual/AI comparison.':
        'Auth đã có S3 manual/reviewed-AI comparison với 23/14 added kills; năm kills mỗi condition có basis trực tiếp từ specification, các kills còn lại cần xét convention hoặc interpretation [21].',
        '| So sánh manual và AI-assisted additions | Cart và Coupons có completed comparison | Auth manual/AI; combined mutation run |':
        '| So sánh manual và AI-assisted additions | Có S3 comparison cả ba domains và joint S4 run [21], [22] | Human review; repeated/controlled generation experiments |',
        'Phạm vi mới là case study trên một SUT, chưa có full three-domain comparison hoặc statistical replication.':
        'Phạm vi là case study trên một SUT, có comparison ba domains và joint execution nhưng chưa có statistical replication.',
        'Các bước nghiên cứu tiếp theo gồm hoàn thiện Auth manual/AI trên cùng frozen input; chạy cross reproduction; và thực hiện combined mutation run nếu cần system-level comparison.':
        'Các bước tiếp theo gồm nhận human review, thực hiện guide-only cross reproduction sau khi có walkthrough bàn giao và lặp lại experiment theo controlled protocol. Joint S4 execution hiện có không thay các bước này.',
        'Auth manual/AI comparison chưa có trong dataset được tổng hợp ở báo cáo này.':
        'F03 manual, G03 reviewed AI và H03 comparison đã được bàn giao dưới dạng source snapshots, reports và mappings [21]; joint S4 run tái dùng các assertions này, không nhận là Hòa tự viết hoặc Hoàng tự thực thi run S4.',
    }
    for a,b in changes.items():
        assert a in text, 'missing original passage: '+a[:90]
        text=text.replace(a,b)
    text=text.replace('| Domain | Baseline survivors | Cả hai kill |','| Domain | Baseline target mutants | Cả hai kill |')
    text=text.replace('| Coupons | 30 | 2 | 0 | 0 | 28 |','| Coupons | 30 Survived | 2 | 0 | 0 | 28 |\n| Authentication & Users | 23 Survived + 7 NoCoverage | 13 | 10 | 1 | 6 |')
    text=text.replace('### 7.5. Failure modes quan sát được','Mục equivalent/limitations được đối chiếu thêm với [Auth Report Contribution](../materials/s4/Report_Contribution_Phuc_Hoang.md) nhận trong merge 4c5db59. Nhãn spec/convention/equivalent candidate là reviewer judgments cần member review; nguồn AI approaches chỉ đọc abstract/trang paper trong contribution đó không được mô tả thành full-text verification.\n\n### 7.5. Failure modes quan sát được')
    auth='''
### 6.7.1. Authentication & Users Handoff Update

Auth S3-H03 khớp 125 signatures giữa baseline, manual và reviewed AI [21]. Manual thêm 23 kills trên 30 baseline Survived/NoCoverage; AI thêm 14. Hai conditions cùng kill 13, manual-only 10, AI-only 1 và cả hai chưa kill 6. Union 24 được suy từ hai reports riêng, không phải kết quả chạy một suite chứa đồng thời manual và AI.

Trong manual, năm kills dựa trực tiếp vào FR-02/03/04; 18 dựa trên conventions body/HTTP khi specification không định nghĩa đủ. Reviewed AI có năm spec-based kills, tám convention kills và một lock-expiry interpretation. Candidate test.failing ban đầu bị loại vì tính một mutant sửa bug role thành kill. Report giữ các giới hạn này thay vì gọi mọi kill là một lỗi nghiệp vụ độc lập.

'''
    rows=[]
    for key,label in [('baseline','Joint baseline'),('manual','Joint manual-analysis'),('ai','Joint reviewed AI')]:
        d=s['profiles'][key]
        rows.append('| '+label+' | '+' | '.join(str(d[k]) for k in ('tests','total','Killed','Timeout','Survived','NoCoverage','RuntimeError','valid'))+f" | {d['score']:.2f}% | {d['assertionKill']:.2f}% |")
    joint='''### 6.8. Joint Three-Domain Execution

S4-E02 chạy mới ba conditions trong local clone riêng từ frozen 806ba19, với branches codex/s4-overall-baseline, codex/s4-overall-manual và codex/s4-overall-ai. Scope là hợp bốn ranges: server.js:20-135, 280-349, 355-492, 510-568. Jest projects giữ harness Auth riêng với Cart/Coupons; defect profiles không tham gia. Production, package/lock và baseline test files được đối chiếu SHA-256 trước/sau [22].

Manual condition dùng Cart b77f5d6, extended Coupons source snapshot và Auth F03; AI condition dùng Cart f4696c6, extended Coupons snapshot và Auth G03 reviewed. Đây là replay các assertions đã bàn giao, không có fresh generation hoặc human self-run trong run này.

| Condition | Tests pass | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | V | Tool score | K/V |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
'''+ '\n'.join(rows)+'\n\n'
    joint+=f"Cả ba reports khớp 395 signatures và normalized source. So joint baseline, manual có {s['comparisons']['manual']['newAssertionKills']} mutant Survived/NoCoverage chuyển sang Killed; AI có {s['comparisons']['ai']['newAssertionKills']}. Intersection added-kill là {s['overlap']['both']}, manual-only {s['overlap']['manualOnly']}, AI-only {s['overlap']['aiOnly']}. Từng state transition và detecting tests được giữ trong mapping [22].\n\n"
    joint+='''Các score trên lấy trực tiếp từ counts của run chung, không cộng hoặc lấy trung bình S3 domain scores. Joint test selection tăng cross-domain coverage, nên kết quả baseline này có thể khác tổng counts domain cũ. RuntimeError và Timeout có thể đổi phân loại; chỉ transitions từ Survived/NoCoverage sang Killed mới được gọi là added assertion kills. Native SQLite crashes được giữ trong logs. Đoạn cuối joint AI run có Auth guide reproduction chạy đồng thời ở clone riêng; machine load không được kiểm soát, không suy causal effect từ timeout changes. Số tests tổng hai variants có thể bằng nhau nhưng phân bổ, scenarios, generation context và oracle basis khác nhau; không suy ra authorship/model superiority.

'''
    joint+='Source postflight phát hiện SUT chính nhận commit ngoài phiên 4b28756 để sửa package.json. Runner lần đầu dừng ở preservation assertion sau khi đủ ba mutation commands hoàn tất; raw reports vẫn được giữ. Runtime frozen production/package/tests không đổi qua ba profiles. Xem recovery record và manifest trong [22]; không báo SUT chính giữ nguyên HEAD.\n\n'
    text=text.replace('<a id="chuong-7"></a>',auth+joint+'<a id="chuong-7"></a>')
    sources='''[21] Nhóm 12, "[Authentication & Users H03 comparison](../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md)," frozen 806ba19, 2026-10-23; raw reports và source ở F03-manual/G03-ai, tách raw/reviewed candidate.

[22] Nhóm 12, "[Joint S4 comparison](../experiments/s4/Overall_Comparison.md)," S4-E02, 2026-10-23. Ba raw HTML/JSON reports, commands, input branch commits, preserved source snapshots và signature mapping tại [run evidence](../experiments/s4/runs/Thai_Hoa/S4-E02-2026-10-23-agent/README.md). Executor: OpenAI Codex AI Agent; human review Pending.

'''
    text=text.replace('<a id="phu-luc-a"></a>',sources+'<a id="phu-luc-a"></a>')
    text+='\n[21]: ../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md\n[22]: ../experiments/s4/Overall_Comparison.md\n'
    text=text.replace('# SEMINAR REPORT\n','# SEMINAR REPORT\n\n**Stage / Task:** S4-E02. Bản ghép từ report draft có sẵn và evidence S3/S4; canonical handoff ở materials/s4/Seminar_Report.md. Human review Pending.\n',1)
    for a,b in [('—','-'),('·',';'),('→','->'),('≥','>='),('≤','<='),('−','-')]:text=text.replace(a,b)
    (ROOT/'draft/Seminar_Report.md').write_text(text,encoding='utf-8',newline='\n')
    canonical=re.sub(r'(\]\(|^\[\d+\]: )(\.\./)',r'\1../../',text,flags=re.M)
    (ROOT/'materials/s4/Seminar_Report.md').write_text(canonical,encoding='utf-8',newline='\n')
    last.write_text(json.dumps({'draftSHA256':hashlib.sha256((ROOT/'draft/Seminar_Report.md').read_bytes()).hexdigest(),'canonicalSHA256':hashlib.sha256((ROOT/'materials/s4/Seminar_Report.md').read_bytes()).hexdigest(),'sourceCommit':SOURCE},indent=2)+'\n')
    print('Updated canonical report and synchronized draft; inserted observed joint data.')

if __name__=='__main__':main()

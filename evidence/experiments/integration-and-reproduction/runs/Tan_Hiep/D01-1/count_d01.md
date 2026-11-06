== coupons: total 120 {"NoCoverage":25,"Killed":39,"Timeout":21,"Survived":30,"RuntimeError":5} score 52.17% killed/valid 33.91%
== coupons-manual: total 120 {"NoCoverage":25,"Killed":41,"Timeout":21,"Survived":28,"RuntimeError":5} score 53.91% killed/valid 35.65%
  vs baseline: 474:7-474:29|ConditionalExpression|true id 111: Survived -> Killed
  vs baseline: 474:7-474:29|LogicalOperator|max_uses_per_user && 1 id 113: Survived -> Killed
== coupons-ai: total 120 {"NoCoverage":25,"Killed":41,"Timeout":21,"Survived":28,"RuntimeError":5} score 53.91% killed/valid 35.65%
  vs baseline: 474:7-474:29|ConditionalExpression|true id 111: Survived -> Killed
  vs baseline: 474:7-474:29|LogicalOperator|max_uses_per_user && 1 id 113: Survived -> Killed
coupons: 0 mutant khác trạng thái so với D01-1-cc
coupons-manual: 0 mutant khác trạng thái so với D01-1-cc
coupons-ai: 0 mutant khác trạng thái so với D01-1-cc

== baseline: total 150, {"NoCoverage":2,"Survived":34,"Timeout":25,"Killed":82,"RuntimeError":7}, score 74.83% | S3 E01-1: {"NoCoverage":2,"Survived":34,"Timeout":25,"Killed":82,"RuntimeError":7}, score 74.83%
  292:7-292:25|BooleanLiteral|userCarts[userId] -> Killed killedBy 1 (S3: Killed)
  292:7-292:25|ConditionalExpression|true -> Survived (S3: Survived)
  292:7-292:25|ConditionalExpression|false -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|false -> Survived (S3: Survived)
  550:11-550:39|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|LogicalOperator|currentStatus === "canceled" || status === "delivered" -> Killed killedBy 1 (S3: Killed)
  550:11-550:39|EqualityOperator|currentStatus !== "canceled" -> Killed killedBy 1 (S3: Killed)
  status khác S3: 0
  tập Survived trùng S3: true
== manual: total 150, {"NoCoverage":2,"Killed":109,"Timeout":21,"RuntimeError":7,"Survived":11}, score 90.91% | S3 F01-2: {"NoCoverage":2,"Killed":112,"Timeout":18,"RuntimeError":7,"Survived":11}, score 90.91%
  292:7-292:25|BooleanLiteral|userCarts[userId] -> Killed killedBy 1 (S3: Killed)
  292:7-292:25|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  292:7-292:25|ConditionalExpression|false -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|false -> Survived (S3: Survived)
  550:11-550:65|LogicalOperator|currentStatus === "canceled" || status === "delivered" -> Killed killedBy 1 (S3: Killed)
  550:11-550:39|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:39|EqualityOperator|currentStatus !== "canceled" -> Killed killedBy 1 (S3: Killed)
  status khác S3: 3
    316:7-316:24|CallExpression|;: Killed -> Timeout
    519:22-521:6|BlockStatement|{}: Killed -> Timeout
    520:7-520:24|CallExpression|;: Killed -> Timeout
  tập Survived trùng S3: true
== ai: total 150, {"NoCoverage":2,"Killed":100,"Timeout":20,"Survived":21,"RuntimeError":7}, score 83.92% | S3 G01-2: {"NoCoverage":2,"Killed":102,"Timeout":18,"Survived":21,"RuntimeError":7}, score 83.92%
  292:7-292:25|BooleanLiteral|userCarts[userId] -> Killed killedBy 1 (S3: Killed)
  292:7-292:25|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  292:7-292:25|ConditionalExpression|false -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:65|ConditionalExpression|false -> Survived (S3: Survived)
  550:11-550:65|LogicalOperator|currentStatus === "canceled" || status === "delivered" -> Killed killedBy 1 (S3: Killed)
  550:11-550:39|ConditionalExpression|true -> Killed killedBy 1 (S3: Killed)
  550:11-550:39|EqualityOperator|currentStatus !== "canceled" -> Killed killedBy 1 (S3: Killed)
  status khác S3: 2
    519:22-521:6|BlockStatement|{}: Killed -> Timeout
    520:7-520:24|CallExpression|;: Killed -> Timeout
  tập Survived trùng S3: true

# Test Cases

| Test ID | Feature | Scenario | Type | Expected Result |
| --- | --- | --- | --- | --- |
| UT-001 | Validation | Accept non-empty string | Unit | Returns true |
| UT-002 | Validation | Reject empty string | Unit | Returns false |
| UT-003 | Validation | Reject unexpected type | Unit | Returns false |
| UT-004 | Validation | Username minimum boundary | Unit | 3-character username is valid |
| UT-005 | Validation | Username below boundary | Unit | 2-character username is invalid |
| UT-006 | Validation | Password minimum boundary | Unit | 4-character password is valid |
| UT-007 | Validation | Missing user fields | Unit | Validation errors are returned |
| UT-008 | Pricing | Calculate line total | Unit | Correct multiplication |
| UT-009 | Pricing | Zero quantity | Unit | Total is zero |
| UT-010 | Pricing | Negative price | Unit | Expected error |
| UT-011 | Pricing | Fractional quantity | Unit | Expected error |
| UT-012 | Pricing | Calculate cart subtotal | Unit | Correct subtotal |
| UT-013 | Pricing | Calculate tax | Unit | Correct tax |
| IT-001 | External user | Successful dependency response | Integration | Active user is returned |
| IT-002 | External user | Dependency failure | Integration | Error is propagated |
| IT-003 | External user | Inactive user | Integration | Inactive user is rejected |
| IT-004 | Checkout | Successful gateway interaction | Integration | Order ID is returned |
| IT-005 | Checkout | Invalid checkout data | Integration | Gateway is not called |
| IT-006 | Checkout | Negative order total | Integration | Validation error is returned |
| IT-007 | Checkout | Gateway failure | Integration | Dependency error is propagated |
| E2E-001 | Login | Valid credentials | E2E | Products page opens |
| E2E-002 | Login | Invalid credentials | E2E | Error message appears |
| E2E-003 | Login | Empty credentials | E2E | Required-field error appears |
| E2E-004 | Login | Locked-out user | E2E | Locked-out message appears |
| E2E-005 | Products | Products page loads | E2E | Six products are visible |
| E2E-006 | Products | Product information | E2E | Name and price are visible |
| E2E-007 | Cart | Add product | E2E | Cart count becomes 1 |
| E2E-008 | Cart | Remove product | E2E | Product can be added again |
| E2E-009 | Cart | Correct item shown | E2E | Expected product is in cart |
| E2E-010 | Cart | Remove from cart page | E2E | Cart becomes empty |
| E2E-011 | Checkout | Form is visible | E2E | Checkout fields are displayed |
| E2E-012 | Checkout | Missing information | E2E | Required-field error appears |
| E2E-013 | Checkout | Successful order | E2E | Thank-you confirmation appears |
| E2E-014 | Navigation | Logout | E2E | Login screen is displayed |

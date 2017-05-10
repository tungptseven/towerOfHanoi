# Tower of Hanoi
Animated Tower of Hanoi's algorithm

### Thuật toán
Sử dụng đệ quy, với n số đĩa, quy ước đĩa nhỏ nhất là 1... đến đĩa lớn nhất là n, trong thuật toán gồm 3 bước chính:

- Bước 1: Xếp (n-1) đĩa từ cột nguồn đến cột trung gian
- Bước 2: Xếp đĩa n từ cột nguồn đến cột đích 
- Bước 3: Xếp (n-1) đĩa từ cột trung gian đến cột đích 

Code:
```$xslt
function stepsToSolveHanoiT(height, srcP, desP, bufferP) {
    if (height >= 1) {
    

        stepsToSolveHanoiT(height - 1, srcP, bufferP, desP);
        

        
        console.log('Move disk',height,'from Tower ', srcP, ' to Tower ', desP);
        

        
        stepsToSolveHanoiT(height - 1, bufferP, desP, srcP);

    }

    return;
}
```
Áp dụng đơn giản với bài toán n = 2:
```$xslt
stepsToSolveHanoiT(2, "A", "C", "B");
```
trong đó:

- 2: số đĩa
- A,C,B: lần lượt là Cột Nguồn, Cột Đích, Cột Trung Gian

Hàm stepsToSolveHanoiT() xét n = 2 > 1:
- Chạy lại hàm stepsToSolveHanoiT() với giá trị n = 1, A,B,C lần lượt là Cột Nguồn, Cột Đích, Cột Trung Gian 
- Tại n = 1, tiếp tục chạy lại hàm stepsToSolveHanoiT() với giá trị n = 0 => kết thúc, quay về hàm stepsToSolveHanoiT() của n = 1 đang chạy dở 
- In ra dòng "Move disk 1 from Tower  A  to Tower  C"
- Chạy tiếp hàm stepsToSolveHanoiT() với n = 0, B,C,A lần lượt là Cột Nguồn, Cột Đích, Cột Trung Gian... cứ tiếp tục đến hết

### D3 testing
https://codepen.io/tungpt7/pen/wdyrGG?editors=1010
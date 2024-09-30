rsync -avz -e ssh /root/FnBill/Backend/ root@62.72.46.89:/root/FnBill/Backend/

Sync frontend Build
rsync -avz -e ssh /root/FnBill/Backend/src/build/ root@62.72.46.89:/root/FnBill/Backend/dist/build/

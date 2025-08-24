import datetime
import tkinter as tk
from tkinter import messagebox
from tkinter import font

used_ids = set()
with open('used_ids.txt', 'r') as file:
    for line in file:
        used_ids.add(line.strip())

def check_qualification():
    id_number = id_entry.get()
    if id_number in used_ids:
        messagebox.showinfo("提示", "此身份證已使用過，請排一般排隊通道。")
    else:
        used_ids.add(id_number)
        with open('used_ids.txt', 'a') as file:
            current_datetime = datetime.datetime.now()
            formatted_datetime = current_datetime.strftime("%Y-%m-%d %I:%M %p")
            file.write(id_number + '\n')

        year = int(year_entry.get())
        month = int(month_entry.get())
        day = int(day_entry.get())

        user_date = datetime.datetime(year, month, day)
        additional_condition = datetime.datetime(48, 12, 31)

        if user_date <= additional_condition :
            messagebox.showinfo("提示", f"符合資格，身分證字號：{id_number}")
        else:
            messagebox.showinfo("提示", "資格不符，請排一般排隊通道")
                
        if user_date <= additional_condition:
            with open('65_ids.txt', 'a') as special_file:
                special_file.write(f"{id_number} {formatted_datetime}\n")

window = tk.Tk()
window.title("VIP快速通關驗證")

font_size = 14
font_style = font.Font(size=font_size)

id_label = tk.Label(window, text="身份證號碼：", font=font_style)
id_label.pack()
id_entry = tk.Entry(window)
id_entry.pack()
id_entry.configure(font=font_style)

year_label = tk.Label(window, text="出生年份：", font=font_style)
year_label.pack()
year_entry = tk.Entry(window)
year_entry.pack()
year_entry.configure(font=font_style)

month_label = tk.Label(window, text="出生月份：", font=font_style)
month_label.pack()
month_entry = tk.Entry(window)
month_entry.pack()
month_entry.configure(font=font_style)

day_label = tk.Label(window, text="出生日期：", font=font_style)
day_label.pack()
day_entry = tk.Entry(window)
day_entry.pack()
day_entry.configure(font=font_style)

entry_width = 20
id_entry.config(width=entry_width)
year_entry.config(width=entry_width)
month_entry.config(width=entry_width)
day_entry.config(width=entry_width)

check_button = tk.Button(window, text="驗證資格", command=check_qualification, font=font_style)
check_button.pack(padx=20, pady=20)

window.geometry("400x300")

window.mainloop()

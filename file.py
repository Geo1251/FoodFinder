f = True
while f:
    try:
        choice = int(input("Выберите цель: 1 - похудение\n\
2 - поддержание\n\
3 - набор мышечной массы\n\
4 - рекомпозиция\n\
>> "))
        if choice not in [1, 2, 3, 4]:
            print("Введите еще раз.")
            continue
        weight = float(input("Введите свой вес\n>> "))
        break
    except KeyboardInterrupt as er:
       exit(1)
    except:
        f = True
        print("Введите еще раз.")

if choice == 1:
    k1 = 1
    k2 = 0.8
    k3 = 2
if choice == 2:
    k1 = 1.5
    k2 = 0.9
    k3 = 2.7
if choice == 3:
    k1 = 1.7
    k2 = 0.8
    k3 = 3.7
if choice == 4:
    k1 = 1.9
    k2 = 0.8
    k3 = 3.3

b = k1 * weight
j = k2 * weight
u = k3 * weight

calories = b*4 + j*9 + u*4
print("Белки: ", b)
print("Жиры: ", j)
print("Углеводы: ", u)
print("Калории: ", calories)



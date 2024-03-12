import pyautogui
import time

time.sleep(4)

for i in range(1500):
	pyautogui.press('space')

pyautogui.hotkey('ctrl', 'a')
pyautogui.press('a')
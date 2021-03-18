https://en.wikipedia.org/wiki/Wikipedia
click Search Wikipedia
type Search Wikipedia as RPA
click searchButton
click //*[@id="mw-content-text"]/div[1]/ul[5]/li[5]/a
read //*[@id="mw-content-text"]/div[1]/p[1] to output
wait 3
dump `output` to output.txt
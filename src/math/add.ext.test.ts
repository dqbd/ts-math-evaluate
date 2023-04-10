import { Add } from "./add";

// Test suite obtained from BigNumber.js

// $ExpectType "2"
type ExtFloatCase0 = Add<"-1", "3">;

// $ExpectType "6"
type ExtFloatCase1 = Add<"-1", "7">;

// $ExpectType "0"
type ExtFloatCase2 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase3 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase4 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase5 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase6 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase7 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase8 = Add<"0", "0">;

// $ExpectType "0"
type ExtFloatCase9 = Add<"0", "0">;

// $ExpectType "1"
type ExtFloatCase10 = Add<"0", "1">;

// $ExpectType "2"
type ExtFloatCase11 = Add<"0", "2">;

// $ExpectType "2"
type ExtFloatCase12 = Add<"0", "2">;

// $ExpectType "5"
type ExtFloatCase13 = Add<"0", "5">;

// $ExpectType "1"
type ExtFloatCase14 = Add<"1", "0">;

// $ExpectType "1"
type ExtFloatCase15 = Add<"1", "0">;

// $ExpectType "1"
type ExtFloatCase16 = Add<"1", "0">;

// $ExpectType "1"
type ExtFloatCase17 = Add<"1", "0">;

// $ExpectType "2"
type ExtFloatCase18 = Add<"1", "1">;

// $ExpectType "2"
type ExtFloatCase19 = Add<"2", "0">;

// $ExpectType "2"
type ExtFloatCase20 = Add<"2", "0">;

// $ExpectType "7"
type ExtFloatCase21 = Add<"7", "0">;

// $ExpectType "-1"
type ExtFloatCase22 = Add<"-1", "0">;

// $ExpectType "-1"
type ExtFloatCase23 = Add<"-1", "0">;

// $ExpectType "-1"
type ExtFloatCase24 = Add<"-1", "0">;

// $ExpectType "-1"
type ExtFloatCase25 = Add<"-1", "0">;

// $ExpectType "4"
type ExtFloatCase26 = Add<"-3", "7">;

// $ExpectType "2"
type ExtFloatCase27 = Add<"-5", "7">;

// $ExpectType "0"
type ExtFloatCase28 = Add<"-7", "7">;

// $ExpectType "0"
type ExtFloatCase29 = Add<"1", "-1">;

// $ExpectType "0"
type ExtFloatCase30 = Add<"2", "-2">;

// $ExpectType "1"
type ExtFloatCase31 = Add<"3", "-2">;

// $ExpectType "10"
type ExtFloatCase32 = Add<"3", "7">;

// $ExpectType "0"
type ExtFloatCase33 = Add<"5", "-5">;

// $ExpectType "3"
type ExtFloatCase34 = Add<"8", "-5">;

// $ExpectType "-4"
type ExtFloatCase35 = Add<"-1", "-3">;

// $ExpectType "-1"
type ExtFloatCase36 = Add<"-2", "1">;

// $ExpectType "-1"
type ExtFloatCase37 = Add<"-2", "1">;

// $ExpectType "-3"
type ExtFloatCase38 = Add<"-3", "0">;

// $ExpectType "-1"
type ExtFloatCase39 = Add<"-4", "3">;

// $ExpectType "-1"
type ExtFloatCase40 = Add<"-9", "8">;

// $ExpectType "-1"
type ExtFloatCase41 = Add<"0", "-1">;

// $ExpectType "-1"
type ExtFloatCase42 = Add<"0", "-1">;

// $ExpectType "-1"
type ExtFloatCase43 = Add<"0", "-1">;

// $ExpectType "-1"
type ExtFloatCase44 = Add<"0", "-1">;

// $ExpectType "-1"
type ExtFloatCase45 = Add<"0", "-1">;

// $ExpectType "-3"
type ExtFloatCase46 = Add<"0", "-3">;

// $ExpectType "-4"
type ExtFloatCase47 = Add<"0", "-4">;

// $ExpectType "-5"
type ExtFloatCase48 = Add<"0", "-5">;

// $ExpectType "-7"
type ExtFloatCase49 = Add<"0", "-7">;

// $ExpectType "-8"
type ExtFloatCase50 = Add<"0", "-8">;

// $ExpectType "26"
type ExtFloatCase51 = Add<"0", "26">;

// $ExpectType "3"
type ExtFloatCase52 = Add<"3.0", "0">;

// $ExpectType "3"
type ExtFloatCase53 = Add<"3.0", "0">;

// $ExpectType "34"
type ExtFloatCase54 = Add<"6", "28">;

// $ExpectType "-3"
type ExtFloatCase55 = Add<"-2", "-1">;

// $ExpectType "-8"
type ExtFloatCase56 = Add<"-5", "-3">;

// $ExpectType "0"
type ExtFloatCase57 = Add<"3", "-3.0">;

// $ExpectType "1.2"
type ExtFloatCase58 = Add<"-1", "2.2">;

// $ExpectType "19"
type ExtFloatCase59 = Add<"-1", "20.0">;

// $ExpectType "2.3"
type ExtFloatCase60 = Add<"-1", "3.3">;

// $ExpectType "78"
type ExtFloatCase61 = Add<"-11", "89">;

// $ExpectType "-25"
type ExtFloatCase62 = Add<"-29", "4">;

// $ExpectType "-10"
type ExtFloatCase63 = Add<"-9", "-1">;

// $ExpectType "-2"
type ExtFloatCase64 = Add<"0", "-2.0">;

// $ExpectType "1.7"
type ExtFloatCase65 = Add<"0", "1.7">;

// $ExpectType "2.1"
type ExtFloatCase66 = Add<"0", "2.1">;

// $ExpectType "2.7"
type ExtFloatCase67 = Add<"0", "2.7">;

// $ExpectType "3.1"
type ExtFloatCase68 = Add<"0", "3.1">;

// $ExpectType "5.8"
type ExtFloatCase69 = Add<"0", "5.8">;

// $ExpectType "8.1"
type ExtFloatCase70 = Add<"0", "8.1">;

// $ExpectType "3.3"
type ExtFloatCase71 = Add<"1.3", "2">;

// $ExpectType "1.5"
type ExtFloatCase72 = Add<"1.5", "0">;

// $ExpectType "1.5"
type ExtFloatCase73 = Add<"1.5", "0">;

// $ExpectType "6.5"
type ExtFloatCase74 = Add<"1.5", "5">;

// $ExpectType "-27"
type ExtFloatCase75 = Add<"1", "-28">;

// $ExpectType "3.8"
type ExtFloatCase76 = Add<"1", "2.8">;

// $ExpectType "2.5"
type ExtFloatCase77 = Add<"2.5", "0">;

// $ExpectType "2.6"
type ExtFloatCase78 = Add<"2.6", "0">;

// $ExpectType "-4"
type ExtFloatCase79 = Add<"2", "-6.0">;

// $ExpectType "232"
type ExtFloatCase80 = Add<"223", "9">;

// $ExpectType "-1"
type ExtFloatCase81 = Add<"3.0", "-4">;

// $ExpectType "4.4"
type ExtFloatCase82 = Add<"3.4", "1">;

// $ExpectType "4.5"
type ExtFloatCase83 = Add<"3", "1.5">;

// $ExpectType "6.5"
type ExtFloatCase84 = Add<"3", "3.5">;

// $ExpectType "373"
type ExtFloatCase85 = Add<"373", "0">;

// $ExpectType "-30"
type ExtFloatCase86 = Add<"7", "-37">;

// $ExpectType "-90"
type ExtFloatCase87 = Add<"7", "-97">;

// $ExpectType "8.1"
type ExtFloatCase88 = Add<"7", "1.1">;

// $ExpectType "977"
type ExtFloatCase89 = Add<"977", "0">;

// $ExpectType "-1.1"
type ExtFloatCase90 = Add<"-1.1", "0">;

// $ExpectType "-1.2"
type ExtFloatCase91 = Add<"-1.2", "0">;

// $ExpectType "61"
type ExtFloatCase92 = Add<"-2.0", "63">;

// $ExpectType "-29"
type ExtFloatCase93 = Add<"-24", "-5">;

// $ExpectType "-8"
type ExtFloatCase94 = Add<"-3", "-5.0">;

// $ExpectType "153"
type ExtFloatCase95 = Add<"-3", "156">;

// $ExpectType "6.1"
type ExtFloatCase96 = Add<"1.10", "5">;

// $ExpectType "123"
type ExtFloatCase97 = Add<"125", "-2">;

// $ExpectType "0.9"
type ExtFloatCase98 = Add<"2", "-1.1">;

// $ExpectType "276"
type ExtFloatCase99 = Add<"278", "-2">;

// $ExpectType "1.3"
type ExtFloatCase100 = Add<"3", "-1.7">;

// $ExpectType "1.1"
type ExtFloatCase101 = Add<"4.1", "-3">;

// $ExpectType "2.7"
type ExtFloatCase102 = Add<"4", "-1.3">;

// $ExpectType "4.4"
type ExtFloatCase103 = Add<"6", "-1.6">;

// $ExpectType "14.5"
type ExtFloatCase104 = Add<"6", "8.5">;

// $ExpectType "695"
type ExtFloatCase105 = Add<"699", "-4">;

// $ExpectType "13.5"
type ExtFloatCase106 = Add<"9.5", "4">;

// $ExpectType "7.8"
type ExtFloatCase107 = Add<"9", "-1.2">;

// $ExpectType "2.3"
type ExtFloatCase108 = Add<"-1.5", "3.8">;

// $ExpectType "-2.6"
type ExtFloatCase109 = Add<"-1.6", "-1">;

// $ExpectType "-4.7"
type ExtFloatCase110 = Add<"-1.7", "-3">;

// $ExpectType "-2.7"
type ExtFloatCase111 = Add<"-1", "-1.7">;

// $ExpectType "-506"
type ExtFloatCase112 = Add<"-1", "-505">;

// $ExpectType "-118"
type ExtFloatCase113 = Add<"-121", "3">;

// $ExpectType "-4.1"
type ExtFloatCase114 = Add<"-5.1", "1">;

// $ExpectType "-504"
type ExtFloatCase115 = Add<"-509", "5">;

// $ExpectType "-5.2"
type ExtFloatCase116 = Add<"-6.2", "1">;

// $ExpectType "-5.1"
type ExtFloatCase117 = Add<"-7.1", "2">;

// $ExpectType "9.2"
type ExtFloatCase118 = Add<"-7.8", "17">;

// $ExpectType "-16"
type ExtFloatCase119 = Add<"-7", "-9.0">;

// $ExpectType "0.49"
type ExtFloatCase120 = Add<"0.49", "0">;

// $ExpectType "-1.7"
type ExtFloatCase121 = Add<"0", "-1.7">;

// $ExpectType "-105"
type ExtFloatCase122 = Add<"0", "-105">;

// $ExpectType "-2.7"
type ExtFloatCase123 = Add<"0", "-2.7">;

// $ExpectType "-5.1"
type ExtFloatCase124 = Add<"0", "-5.1">;

// $ExpectType "0.23"
type ExtFloatCase125 = Add<"0", "0.23">;

// $ExpectType "1.05"
type ExtFloatCase126 = Add<"0", "1.05">;

// $ExpectType "11.9"
type ExtFloatCase127 = Add<"0", "11.9">;

// $ExpectType "2.09"
type ExtFloatCase128 = Add<"0", "2.09">;

// $ExpectType "0.1"
type ExtFloatCase129 = Add<"1.10", "-1">;

// $ExpectType "1.14"
type ExtFloatCase130 = Add<"1.14", "0">;

// $ExpectType "85.9"
type ExtFloatCase131 = Add<"1", "84.9">;

// $ExpectType "18.1"
type ExtFloatCase132 = Add<"14", "4.1">;

// $ExpectType "18.3"
type ExtFloatCase133 = Add<"17.3", "1">;

// $ExpectType "2.28"
type ExtFloatCase134 = Add<"2.28", "0">;

// $ExpectType "-363"
type ExtFloatCase135 = Add<"2", "-365">;

// $ExpectType "34.9"
type ExtFloatCase136 = Add<"3", "31.9">;

// $ExpectType "-1.1"
type ExtFloatCase137 = Add<"4.9", "-6">;

// $ExpectType "48.4"
type ExtFloatCase138 = Add<"46.4", "2">;

// $ExpectType "130"
type ExtFloatCase139 = Add<"6.0", "124">;

// $ExpectType "9.86"
type ExtFloatCase140 = Add<"6", "3.86">;

// $ExpectType "31.9"
type ExtFloatCase141 = Add<"7", "24.9">;

// $ExpectType "89.4"
type ExtFloatCase142 = Add<"88", "1.4">;

// $ExpectType "9.73"
type ExtFloatCase143 = Add<"9.73", "0">;

// $ExpectType "0.1"
type ExtFloatCase144 = Add<"-1.2", "1.30">;

// $ExpectType "-10.1"
type ExtFloatCase145 = Add<"-10.1", "0">;

// $ExpectType "-183"
type ExtFloatCase146 = Add<"-221", "38">;

// $ExpectType "10.3"
type ExtFloatCase147 = Add<"-3", "13.3">;

// $ExpectType "-8.1"
type ExtFloatCase148 = Add<"-4.1", "-4">;

// $ExpectType "-4.9"
type ExtFloatCase149 = Add<"-4.90", "0">;

// $ExpectType "10.27"
type ExtFloatCase150 = Add<"1.27", "9">;

// $ExpectType "0.5"
type ExtFloatCase151 = Add<"2.0", "-1.5">;

// $ExpectType "21.6"
type ExtFloatCase152 = Add<"22.6", "-1">;

// $ExpectType "1.73"
type ExtFloatCase153 = Add<"3", "-1.27">;

// $ExpectType "25.2"
type ExtFloatCase154 = Add<"32.2", "-7">;

// $ExpectType "11.11"
type ExtFloatCase155 = Add<"5.11", "6">;

// $ExpectType "48.1"
type ExtFloatCase156 = Add<"52.1", "-4">;

// $ExpectType "10.1"
type ExtFloatCase157 = Add<"7.2", "2.9">;

// $ExpectType "24.18"
type ExtFloatCase158 = Add<"-0.82", "25">;

// $ExpectType "43.06"
type ExtFloatCase159 = Add<"-0.94", "44">;

// $ExpectType "-144"
type ExtFloatCase160 = Add<"-1.0", "-143">;

// $ExpectType "-2.99"
type ExtFloatCase161 = Add<"-1.99", "-1">;

// $ExpectType "-2.11"
type ExtFloatCase162 = Add<"-2.11", "0">;

// $ExpectType "-4.16"
type ExtFloatCase163 = Add<"-4.16", "0">;

// $ExpectType "-10.8"
type ExtFloatCase164 = Add<"-7.8", "-3">;

// $ExpectType "-13.9"
type ExtFloatCase165 = Add<"0", "-13.9">;

// $ExpectType "-2.18"
type ExtFloatCase166 = Add<"0", "-2.18">;

// $ExpectType "-24.7"
type ExtFloatCase167 = Add<"0", "-24.7">;

// $ExpectType "-2599"
type ExtFloatCase168 = Add<"0", "-2599">;

// $ExpectType "-28.4"
type ExtFloatCase169 = Add<"0", "-28.4">;

// $ExpectType "-3.12"
type ExtFloatCase170 = Add<"0", "-3.12">;

// $ExpectType "-3.89"
type ExtFloatCase171 = Add<"0", "-3.89">;

// $ExpectType "-8.59"
type ExtFloatCase172 = Add<"0", "-8.59">;

// $ExpectType "2.22"
type ExtFloatCase173 = Add<"1.02", "1.2">;

// $ExpectType "-7.3"
type ExtFloatCase174 = Add<"1.2", "-8.5">;

// $ExpectType "-0.2"
type ExtFloatCase175 = Add<"1.5", "-1.7">;

// $ExpectType "-1.73"
type ExtFloatCase176 = Add<"1", "-2.73">;

// $ExpectType "113.2"
type ExtFloatCase177 = Add<"107", "6.2">;

// $ExpectType "103.8"
type ExtFloatCase178 = Add<"2.8", "101">;

// $ExpectType "-15.3"
type ExtFloatCase179 = Add<"6", "-21.3">;

// $ExpectType "769.1"
type ExtFloatCase180 = Add<"768", "1.1">;

// $ExpectType "80.5"
type ExtFloatCase181 = Add<"78.3", "2.2">;

// $ExpectType "16.3"
type ExtFloatCase182 = Add<"-2.8", "19.1">;

// $ExpectType "-4.2"
type ExtFloatCase183 = Add<"-2.9", "-1.3">;

// $ExpectType "-10.6"
type ExtFloatCase184 = Add<"-2", "-8.60">;

// $ExpectType "-26.6"
type ExtFloatCase185 = Add<"-24", "-2.6">;

// $ExpectType "-7.96"
type ExtFloatCase186 = Add<"-3", "-4.96">;

// $ExpectType "-14.4"
type ExtFloatCase187 = Add<"-32", "17.6">;

// $ExpectType "-48.4"
type ExtFloatCase188 = Add<"-47.4", "-1">;

// $ExpectType "-93.4"
type ExtFloatCase189 = Add<"-92", "-1.4">;

// $ExpectType "-0.6"
type ExtFloatCase190 = Add<"2.6", "-3.20">;

// $ExpectType "-9.3"
type ExtFloatCase191 = Add<"6.4", "-15.7">;

// $ExpectType "577.5"
type ExtFloatCase192 = Add<"68.5", "509">;

// $ExpectType "92.8"
type ExtFloatCase193 = Add<"94.2", "-1.4">;

// $ExpectType "100000"
type ExtFloatCase194 = Add<"99999", "1">;

// $ExpectType "-46.9"
type ExtFloatCase195 = Add<"-1.0", "-45.9">;

// $ExpectType "-6.5"
type ExtFloatCase196 = Add<"-1.46", "-5.04">;

// $ExpectType "-26.1"
type ExtFloatCase197 = Add<"-12.1", "-14">;

// $ExpectType "-14.5"
type ExtFloatCase198 = Add<"-21.3", "6.8">;

// $ExpectType "-52"
type ExtFloatCase199 = Add<"-3.80", "-48.2">;

// $ExpectType "-2.78"
type ExtFloatCase200 = Add<"-3.98", "1.2">;

// $ExpectType "-49.9"
type ExtFloatCase201 = Add<"-53.9", "4.0">;

// $ExpectType "-23.4"
type ExtFloatCase202 = Add<"1.0", "-24.4">;

// $ExpectType "-2.57"
type ExtFloatCase203 = Add<"1.1", "-3.67">;

// $ExpectType "-30.3"
type ExtFloatCase204 = Add<"1.1", "-31.4">;

// $ExpectType "-25.6"
type ExtFloatCase205 = Add<"1.6", "-27.2">;

// $ExpectType "-2.19"
type ExtFloatCase206 = Add<"4.0", "-6.19">;

// $ExpectType "-48.9"
type ExtFloatCase207 = Add<"6.2", "-55.1">;

// $ExpectType "-7.09"
type ExtFloatCase208 = Add<"-2.29", "-4.8">;

// $ExpectType "-5.95"
type ExtFloatCase209 = Add<"-2.7", "-3.25">;

// $ExpectType "-41.42"
type ExtFloatCase210 = Add<"-0.52", "-40.9">;

// $ExpectType "-1305.3"
type ExtFloatCase211 = Add<"-1307.3", "2">;

// $ExpectType "-233.4"
type ExtFloatCase212 = Add<"-20.4", "-213">;

// $ExpectType "-29.02"
type ExtFloatCase213 = Add<"-30.5", "1.48">;

// $ExpectType "-40.887"
type ExtFloatCase214 = Add<"-41", "0.113">;

// $ExpectType "-100.6"
type ExtFloatCase215 = Add<"-97.5", "-3.1">;

// $ExpectType "-4.9933"
type ExtFloatCase216 = Add<"0.0067", "-5">;

// $ExpectType "12.161"
type ExtFloatCase217 = Add<"0.061", "12.1">;

// $ExpectType "0.00211"
type ExtFloatCase218 = Add<"0", "0.00211">;

// $ExpectType "-405.78"
type ExtFloatCase219 = Add<"-2.78", "-403">;

// $ExpectType "-133.7"
type ExtFloatCase220 = Add<"-86.5", "-47.2">;

// $ExpectType "0.99937"
type ExtFloatCase221 = Add<"1", "-0.00063">;

// $ExpectType "10.651"
type ExtFloatCase222 = Add<"10.07", "0.581">;

// $ExpectType "-2.0886"
type ExtFloatCase223 = Add<"-2.1", "0.0114">;

// $ExpectType "-5.99941"
type ExtFloatCase224 = Add<"-6", "0.00059">;

// $ExpectType "6.000024"
type ExtFloatCase225 = Add<"0.000024", "6">;

// $ExpectType "13970000"
type ExtFloatCase226 = Add<"5", "13969995">;

// $ExpectType "79.00019"
type ExtFloatCase227 = Add<"79", "0.000190">;

// $ExpectType "-6.000015"
type ExtFloatCase228 = Add<"-0.000015", "-6">;

// $ExpectType "1.300103"
type ExtFloatCase229 = Add<"1.3", "0.000103">;

// $ExpectType "545529.61"
type ExtFloatCase230 = Add<"-4.39", "545534">;

// $ExpectType "-5.10024"
type ExtFloatCase231 = Add<"-5.1", "-0.00024">;

// $ExpectType "70.399912"
type ExtFloatCase232 = Add<"-0.000088", "70.4">;

// $ExpectType "-0.11611"
type ExtFloatCase233 = Add<"0.00089", "-0.117">;

// $ExpectType "-0.0000085"
type ExtFloatCase234 = Add<"0", "-0.0000085">;

// $ExpectType "15.400014"
type ExtFloatCase235 = Add<"15.4", "0.000014">;

// $ExpectType "1862736419"
type ExtFloatCase236 = Add<"1862736418", "1">;

// $ExpectType "-0.00000871"
type ExtFloatCase237 = Add<"-0.00000871", "0">;

// $ExpectType "1.1999806"
type ExtFloatCase238 = Add<"1.2", "-0.0000194">;

// $ExpectType "145.0000055"
type ExtFloatCase239 = Add<"0.0000055", "145">;

// $ExpectType "12.99999795"
type ExtFloatCase240 = Add<"13", "-0.00000205">;

// $ExpectType "-195.01799"
type ExtFloatCase241 = Add<"-2.2", "-192.817990">;

// $ExpectType "1.700000041"
type ExtFloatCase242 = Add<"1.7", "0.000000041">;

// $ExpectType "9.999999884"
type ExtFloatCase243 = Add<"10", "-0.000000116">;

// $ExpectType "4.199999938"
type ExtFloatCase244 = Add<"4.2", "-0.000000062">;

// $ExpectType "-1.0000000853"
type ExtFloatCase245 = Add<"-1", "-0.0000000853">;

// $ExpectType "1679140357.9"
type ExtFloatCase246 = Add<"-34", "1679140391.9">;

// $ExpectType "54030292.9001"
type ExtFloatCase247 = Add<"54030292.9001", "0">;

// $ExpectType "-1.2999999952"
type ExtFloatCase248 = Add<"-1.3", "0.0000000048">;

// $ExpectType "-6.0000000045"
type ExtFloatCase249 = Add<"-6", "-0.0000000045">;

// $ExpectType "1.999999999758"
type ExtFloatCase250 = Add<"2", "-0.000000000242">;

// $ExpectType "280550744.708"
type ExtFloatCase251 = Add<"280550729.708", "15.0">;

// $ExpectType "5218375.47516"
type ExtFloatCase252 = Add<"3.98", "5218371.49516">;

// $ExpectType "-25.00000000151"
type ExtFloatCase253 = Add<"-0.00000000151", "-25">;

// $ExpectType "-723054.2043"
type ExtFloatCase254 = Add<"-226963.2043", "-496091">;

// $ExpectType "18.2100000801"
type ExtFloatCase255 = Add<"0.00000008010", "18.21">;

// $ExpectType "231.00000000408"
type ExtFloatCase256 = Add<"231", "0.00000000408">;

// $ExpectType "5081846550.8724"
type ExtFloatCase257 = Add<"5081846528", "22.8724">;

// $ExpectType "5.999999999999973"
type ExtFloatCase258 = Add<"-0.000000000000027", "6">;

// $ExpectType "-5250098.76439982"
type ExtFloatCase259 = Add<"-5250099.76439982", "1">;

// $ExpectType "86.00000000000015"
type ExtFloatCase260 = Add<"0.00000000000015", "86">;

// $ExpectType "16229113210070.34"
type ExtFloatCase261 = Add<"16229113210072", "-1.66">;

// $ExpectType "-316531.28076826"
type ExtFloatCase262 = Add<"-316537.13", "5.849231740">;

// $ExpectType "-6932.702341315865"
type ExtFloatCase263 = Add<"0", "-6932.702341315865">;

// $ExpectType "-1406576092.7762"
type ExtFloatCase264 = Add<"-1406576080.91", "-11.8662">;

// $ExpectType "2.199999999999939"
type ExtFloatCase265 = Add<"2.2", "-0.000000000000061">;

// $ExpectType "-2846.9387541278"
type ExtFloatCase266 = Add<"30.873", "-2877.8117541278">;

// $ExpectType "15874309893574389.8"
type ExtFloatCase267 = Add<"15874309893574389.8", "0">;

// $ExpectType "284576176526552340"
type ExtFloatCase268 = Add<"284576176526552350", "-10">;

// $ExpectType "7.8000000000000025"
type ExtFloatCase269 = Add<"7.8", "0.0000000000000025">;

// $ExpectType "-959175810195.363"
type ExtFloatCase270 = Add<"-12.393", "-959175810182.97">;

// $ExpectType "-5.0000000000000016"
type ExtFloatCase271 = Add<"-5", "-0.0000000000000016">;

// $ExpectType "-11.699999999999986"
type ExtFloatCase272 = Add<"-11.7", "0.000000000000014">;

// $ExpectType "-2318172324.38510421"
type ExtFloatCase273 = Add<"-2318172325.38510421", "1">;

// $ExpectType "4364775035.4655"
type ExtFloatCase274 = Add<"4364458714.2682", "316321.1973">;

// $ExpectType "128906.8518369701779"
type ExtFloatCase275 = Add<"128907.8518369701779", "-1">;

// $ExpectType "0.9999999999999999925"
type ExtFloatCase276 = Add<"-0.00000000000000000750", "1">;

// $ExpectType "-2.000000000000000118"
type ExtFloatCase277 = Add<"-0.000000000000000118", "-2">;

// $ExpectType "51.000000000000000757"
type ExtFloatCase278 = Add<"51", "0.000000000000000757">;

// $ExpectType "-103974.538149562507"
type ExtFloatCase279 = Add<"-103912.138149562507", "-62.4">;

// $ExpectType "-25333165941032.96905"
type ExtFloatCase280 = Add<"-25333165941026", "-6.96905">;

// $ExpectType "-37479660229.90198"
type ExtFloatCase281 = Add<"-37479660228.14714", "-1.75484">;

// $ExpectType "3417322561.4831394174"
type ExtFloatCase282 = Add<"-8", "3417322569.4831394174">;

// $ExpectType "-31115.5429270414"
type ExtFloatCase283 = Add<"2317.37783", "-33432.9207570414">;

// $ExpectType "20221306791.52574"
type ExtFloatCase284 = Add<"3804404287.52574", "16416902504">;

// $ExpectType "-5.300000000000000451"
type ExtFloatCase285 = Add<"-0.000000000000000451", "-5.3">;

// $ExpectType "-6554779180145532629"
type ExtFloatCase286 = Add<"-106653", "-6554779180145425976">;

// $ExpectType "-4.99999999999999999989"
type ExtFloatCase287 = Add<"-5", "0.00000000000000000011">;

// $ExpectType "-1.99999999999999999984"
type ExtFloatCase288 = Add<"0.00000000000000000016", "-2">;

// $ExpectType "-3110562715962.905"
type ExtFloatCase289 = Add<"37586361614.095", "-3148149077577">;

// $ExpectType "40022942.24384250896"
type ExtFloatCase290 = Add<"-205.787", "40023148.03084250896">;

// $ExpectType "-7926553114782.75413"
type ExtFloatCase291 = Add<"-5.40620", "-7926553114777.34793">;

// $ExpectType "-7.00000000000000000511"
type ExtFloatCase292 = Add<"-7", "-0.00000000000000000511">;

// $ExpectType "26.078000000000114387"
type ExtFloatCase293 = Add<"0.000000000000114387", "26.0780">;

// $ExpectType "-27722866.863296087173"
type ExtFloatCase294 = Add<"32.0", "-27722898.863296087173">;

// $ExpectType "-11054563.76681950544"
type ExtFloatCase295 = Add<"-299.92", "-11054263.84681950544">;

// $ExpectType "12.60000023237282267118"
type ExtFloatCase296 = Add<"12.6", "0.00000023237282267118">;

// $ExpectType "9.0000000000000000000157"
type ExtFloatCase297 = Add<"9", "0.0000000000000000000157">;

// $ExpectType "265.41036926198544821143"
type ExtFloatCase298 = Add<"-2", "267.41036926198544821143">;

// $ExpectType "-5.79999999999999999989"
type ExtFloatCase299 = Add<"0.000000000000000000110", "-5.8">;

// $ExpectType "9.250081202465051128565"
type ExtFloatCase300 = Add<"0.000081202465051128565", "9.25">;

// $ExpectType "36.999999999999999999972"
type ExtFloatCase301 = Add<"37", "-0.000000000000000000028">;

// $ExpectType "28592560366130.354898"
type ExtFloatCase302 = Add<"66.60837", "28592560366063.746528">;

// $ExpectType "-34126709758866.8105337"
type ExtFloatCase303 = Add<"-34126709757832", "-1034.8105337">;

// $ExpectType "16.0206938113100042"
type ExtFloatCase304 = Add<"16.02069381131", "0.0000000000000042">;

// $ExpectType "43537539.360990512037"
type ExtFloatCase305 = Add<"2442.32751", "43535097.033480512037">;

// $ExpectType "663864508128.448413"
type ExtFloatCase306 = Add<"2758033402.5184130", "661106474725.93">;

// $ExpectType "82341713714863149.602"
type ExtFloatCase307 = Add<"13773756.65", "82341713701089392.952">;

// $ExpectType "8629631914093.802277191"
type ExtFloatCase308 = Add<"8629631914097.8362771910", "-4.034">;

// $ExpectType "261548573278668655.016"
type ExtFloatCase309 = Add<"-1029316.894", "261548573279697971.910">;

// $ExpectType "-17.630000000000000012319"
type ExtFloatCase310 = Add<"-17.63", "-0.000000000000000012319">;

// $ExpectType "-0.000057177318672224"
type ExtFloatCase311 = Add<"0.000000000001327776", "-0.00005717732">;

// $ExpectType "7545576179283.8022825"
type ExtFloatCase312 = Add<"7545686522420.04", "-110343136.2377175">;

// $ExpectType "10533716832.0077148964"
type ExtFloatCase313 = Add<"-46.3370059936", "10533716878.34472089">;

// $ExpectType "-2064784960.075157186233"
type ExtFloatCase314 = Add<"380658.3", "-2065165618.375157186233">;

// $ExpectType "-340867371991994.2297636"
type ExtFloatCase315 = Add<"-340867371992331.2987436", "337.06898">;

// $ExpectType "13658085111649300.8518"
type ExtFloatCase316 = Add<"-505517596445.1482", "13658590629245746">;

// $ExpectType "81757261120729.4077691292"
type ExtFloatCase317 = Add<"81757261120729.3998391292", "0.00793">;

// $ExpectType "-14349223295185.8996911241"
type ExtFloatCase318 = Add<"-14349223886609.8996911241", "591424">;

// $ExpectType "-22815991413925.0165058"
type ExtFloatCase319 = Add<"-255163.150", "-22815991158761.86650580">;

// $ExpectType "7862.351321183677379038987"
type ExtFloatCase320 = Add<"1.0682", "7861.283121183677379038987">;

// $ExpectType "5988.1290078423747091"
type ExtFloatCase321 = Add<"5997.3860262975745", "-9.2570184551997909">;

// $ExpectType "2337129720776278853.785"
type ExtFloatCase322 = Add<"-145880984716.215", "2337129866657263570">;

// $ExpectType "3576655.494544723114530285809"
type ExtFloatCase323 = Add<"2.494544723114530285809", "3576653">;

// $ExpectType "79808580452454573.1021583877"
type ExtFloatCase324 = Add<"2.5", "79808580452454570.6021583877">;

// $ExpectType "24311940840739127.192938"
type ExtFloatCase325 = Add<"24311907546797437.192938", "33293941690">;

// $ExpectType "368497345356.119203344421595"
type ExtFloatCase326 = Add<"-0.020796655578405", "368497345356.14">;

// $ExpectType "-20479253407195868027.7190887"
type ExtFloatCase327 = Add<"-4", "-20479253407195868023.7190887">;

// $ExpectType "1746794014.969741036766"
type ExtFloatCase328 = Add<"-198.9786279245", "1746794213.948368961266">;

// $ExpectType "-34689532862010713681"
type ExtFloatCase329 = Add<"-35898806424024840518", "1209273562014126837">;

// $ExpectType "-364368666.4780297340551135"
type ExtFloatCase330 = Add<"-364369717.74", "1051.2619702659448865">;

// $ExpectType "332616308893783224.9381"
type ExtFloatCase331 = Add<"332566083814742507.4381", "50225079040717.5">;

// $ExpectType "1.00000000108663482163751960896"
type ExtFloatCase332 = Add<"1", "0.00000000108663482163751960896">;

// $ExpectType "1871682285106014201.580802"
type ExtFloatCase333 = Add<"11973889508.580802", "1871682273132124693">;

// $ExpectType "2132422929.8131489937516147609"
type ExtFloatCase334 = Add<"2132422616", "313.8131489937516147609">;

// $ExpectType "2353795.821199775358305790461"
type ExtFloatCase335 = Add<"-26.87", "2353822.691199775358305790461">;

// $ExpectType "-7925237.1294199999533558575"
type ExtFloatCase336 = Add<"0.0000000000466441425", "-7925237.129420">;

// $ExpectType "1.99999999999999994133447540069"
type ExtFloatCase337 = Add<"2", "-0.00000000000000005866552459931">;

// $ExpectType "38822623294205505.6130785519203"
type ExtFloatCase338 = Add<"-1.3", "38822623294205506.9130785519203">;

// $ExpectType "-165734300510100503272.5277"
type ExtFloatCase339 = Add<"-165734300554398023710.52770", "44297520438">;

// $ExpectType "-0.000001372546101722523"
type ExtFloatCase340 = Add<"-0.000000000000053692523", "-0.00000137254604803">;

// $ExpectType "40.3565418395455196884145"
type ExtFloatCase341 = Add<"0.0535616342876656884145", "40.302980205257854">;

// $ExpectType "-3537763728425648652.862545229"
type ExtFloatCase342 = Add<"245.6735", "-3537763728425648898.536045229">;

// $ExpectType "122805001870676.60389900859999"
type ExtFloatCase343 = Add<"122805001870129.621993", "546.98190600859999">;

// $ExpectType "-21.71589564966937581603353238783"
type ExtFloatCase344 = Add<"-21.716", "0.00010435033062418396646761217">;

// $ExpectType "-18942731595.2262116380197806"
type ExtFloatCase345 = Add<"-40760.965467", "-18942690834.2607446380197806">;

// $ExpectType "-23439088778534584.8640688389613841"
type ExtFloatCase346 = Add<"-23439088778534600.8640688389613841", "16">;

// $ExpectType "14240101.34382757891637692908119148"
type ExtFloatCase347 = Add<"-9", "14240110.34382757891637692908119148">;

// $ExpectType "3.0094999999994573381825799515666"
type ExtFloatCase348 = Add<"3.0095", "-0.0000000000005426618174200484334">;

// $ExpectType "-104251055525872044081.15896754"
type ExtFloatCase349 = Add<"-104251055525855379611.30896754", "-16664469.85">;

// $ExpectType "-8678484380.32251265257072771"
type ExtFloatCase350 = Add<"-5708346691.2506", "-2970137689.07191265257072771">;

// $ExpectType "-1387662245.77641048140759932"
type ExtFloatCase351 = Add<"0.05330917360748068", "-1387662245.82971965501508">;

// $ExpectType "288071239549.1261824965452941330232"
type ExtFloatCase352 = Add<"288071238497.1261824965452941330232", "1052">;

// $ExpectType "-4464346608.0301991824416038881101099"
type ExtFloatCase353 = Add<"-0.0301991824416038881101099", "-4464346608">;

// $ExpectType "3419150506.6848792897978147311"
type ExtFloatCase354 = Add<"-1985677.0479797102021852689", "3421136183.732859">;

// $ExpectType "-497192369044442579.4370737"
type ExtFloatCase355 = Add<"-497191321049479298.6006597", "-1047994963280.836414">;

// $ExpectType "-272186438753204032.5290763255"
type ExtFloatCase356 = Add<"-5400652.348672", "-272186438747803380.1804043255">;

// $ExpectType "-2223770480.35107849308579478385"
type ExtFloatCase357 = Add<"132753213.74892150691420521615", "-2356523694.1">;

// $ExpectType "175912936198164.4618551261464"
type ExtFloatCase358 = Add<"161134348969753.7818551261464", "14778587228410.68">;

// $ExpectType "2353147.291722835947935618253"
type ExtFloatCase359 = Add<"2353147.270338458726403618253", "0.021384377221532">;

// $ExpectType "-91954290028090804.958570516664965"
type ExtFloatCase360 = Add<"4.6142", "-91954290028090809.5727705166649650">;

// $ExpectType "-26.2070000000000031037896000885366"
type ExtFloatCase361 = Add<"-26.207", "-0.0000000000000031037896000885366">;

// $ExpectType "-11939719.5268543409973825061603"
type ExtFloatCase362 = Add<"0.00000000000261749383970", "-11939719.526854341">;

// $ExpectType "-315915.5310342551588622504494297"
type ExtFloatCase363 = Add<"413.7126477448411377495505703", "-316329.243682">;

// $ExpectType "-23084021.1912000002552886320752142"
type ExtFloatCase364 = Add<"-23084021.1912", "-0.0000000002552886320752142">;

// $ExpectType "-50947076888389392.2903516223716887"
type ExtFloatCase365 = Add<"-26.736", "-50947076888389365.5543516223716887">;

// $ExpectType "-557553079116126927148.00346222066"
type ExtFloatCase366 = Add<"-557553079116126732746.60346222066", "-194401.4">;

// $ExpectType "30288482854768.0644829772783388118"
type ExtFloatCase367 = Add<"-1036072.70", "30288483890840.7644829772783388118">;

// $ExpectType "-141742173848073089.100575461779634531"
type ExtFloatCase368 = Add<"-141742173848073082.100575461779634531", "-7">;

// $ExpectType "-5148.9287037300003511413413454972"
type ExtFloatCase369 = Add<"-5148.92870373", "-0.0000000000003511413413454972">;

// $ExpectType "-113364497027517.66603486605659"
type ExtFloatCase370 = Add<"-113364492557824.61981595", "-4469693.046218916056590">;

// $ExpectType "229003.7996129997835780196022124839"
type ExtFloatCase371 = Add<"229183.9324129997835780196022124839", "-180.13280">;

// $ExpectType "2418460022267862493.857986607816857109"
type ExtFloatCase372 = Add<"2418460022267862452.4", "41.457986607816857109">;

// $ExpectType "-1952712333.155776956436340028"
type ExtFloatCase373 = Add<"-1952712333.155776956436338241", "-0.000000000000001787">;

// $ExpectType "-290987195118120992.550828527355125621"
type ExtFloatCase374 = Add<"-81.9", "-290987195118120910.650828527355125621">;

// $ExpectType "-8962353.9223225558327603574935"
type ExtFloatCase375 = Add<"-8793636.6549628644427603574935", "-168717.26735969139">;

// $ExpectType "351490387188996321.100460124428609287573"
type ExtFloatCase376 = Add<"351490387188996259", "62.100460124428609287573">;

// $ExpectType "-8662506.863729764613058828364567651431"
type ExtFloatCase377 = Add<"-8663116.663729764613058828364567651431", "609.8">;

// $ExpectType "-36043841896699925.00000000000000000003511"
type ExtFloatCase378 = Add<"-0.00000000000000000003511", "-36043841896699925">;

// $ExpectType "6930118317156.570424306248284519348"
type ExtFloatCase379 = Add<"-0.006555884028715480652", "6930118317156.576980190277">;

// $ExpectType "17217.222056510208006204903853"
type ExtFloatCase380 = Add<"-134.1362825800766312455", "17351.358339090284637450403853">;

// $ExpectType "-21.0000000000000397635708714407055658459"
type ExtFloatCase381 = Add<"-21", "-0.0000000000000397635708714407055658459">;

// $ExpectType "-332959.350834401166764502923914"
type ExtFloatCase382 = Add<"-332959.31909282242075209", "-0.031741578746012412923914">;

// $ExpectType "1374945.0974826003903229567653167590578"
type ExtFloatCase383 = Add<"1374939.4348", "5.6626826003903229567653167590578">;

// $ExpectType "16408179632578.800320898623499"
type ExtFloatCase384 = Add<"2952858872457.929554397223499", "13455320760120.8707665014">;

// $ExpectType "489936.3780742473458733440028228509907624"
type ExtFloatCase385 = Add<"489937.3780742473458733440028228509907624", "-1">;

// $ExpectType "64302.84878999999999999968115137788236"
type ExtFloatCase386 = Add<"64302.84879", "-0.00000000000000000031884862211764">;

// $ExpectType "-30380533.92757959563144456679338699"
type ExtFloatCase387 = Add<"-0.00007217386", "-30380533.92750742177144456679338699">;

// $ExpectType "20393092845.000000000004945130554715279352"
type ExtFloatCase388 = Add<"0.000000000004945130554715279352", "20393092845">;

// $ExpectType "163.09176000000000001823481782581109744"
type ExtFloatCase389 = Add<"163.09176", "0.00000000000000001823481782581109744">;

// $ExpectType "0.94896608904564340415501438249594708577"
type ExtFloatCase390 = Add<"-0.72263391095435659584498561750405291423", "1.6716">;

// $ExpectType "-35267005558911826.22767772625498979866"
type ExtFloatCase391 = Add<"-117.491", "-35267005558911708.73667772625498979866">;

// $ExpectType "-4.75634615807824749938288854"
type ExtFloatCase392 = Add<"-4.75634838524050727239455330", "0.00000222716225977301166476">;

// $ExpectType "7517.050000000000012756394816575404961299"
type ExtFloatCase393 = Add<"0.000000000000012756394816575404961299", "7517.05">;

// $ExpectType "0.697065625726538697422064467113678"
type ExtFloatCase394 = Add<"0.000000000000989697422064467113678", "0.697065625725549">;

// $ExpectType "10553.64999950313423752835458996141546196"
type ExtFloatCase395 = Add<"10553.65", "-0.00000049686576247164541003858453804">;

// $ExpectType "-2055.81081157583767328469895150540542282"
type ExtFloatCase396 = Add<"-2055.8130", "0.00218842416232671530104849459457718">;

// $ExpectType "-33441526086.7607713725472193611665003418"
type ExtFloatCase397 = Add<"-33441632499.7607713725472193611665003418", "106413">;

// $ExpectType "-9.956135234523838665700444005467417478"
type ExtFloatCase398 = Add<"-2.17399974", "-7.782135494523838665700444005467417478">;

// $ExpectType "-2331.98849327654829970345190803285"
type ExtFloatCase399 = Add<"-2331.988493276549717942", "0.00000000000141823854809196715">;

// $ExpectType "-309.30000000000006218919975652358743864716"
type ExtFloatCase400 = Add<"-309.3", "-0.00000000000006218919975652358743864716">;

// $ExpectType "-39380632121496755483.219999996071965954136"
type ExtFloatCase401 = Add<"0.000000003928034045864", "-39380632121496755483.22">;

// $ExpectType "9936044410110811164.253522812643802"
type ExtFloatCase402 = Add<"58302388.37179491476", "9936044410052508775.881727897883802">;

// $ExpectType "-17.13943676066550687811210739718966133"
type ExtFloatCase403 = Add<"-17.1394344634", "-0.00000229726550687811210739718966133">;

// $ExpectType "27695886984688431669.70000000000000009834358"
type ExtFloatCase404 = Add<"0.00000000000000009834358", "27695886984688431669.7">;

// $ExpectType "-14879.8820896418855282363549762"
type ExtFloatCase405 = Add<"35.9888417583081351968218538", "-14915.870931400193663433176830">;

// $ExpectType "-6343.979004930838214611463664282"
type ExtFloatCase406 = Add<"494.839191894412897545883335718", "-6838.818196825251112157347">;

// $ExpectType "-20008571757213347776.4607772346143954532"
type ExtFloatCase407 = Add<"-150034638.4607772346143954532", "-20008571757063313138">;

// $ExpectType "-2994881.21080633857477562892725843748"
type ExtFloatCase408 = Add<"-2916468.72915302357477562892725843748", "-78412.481653315">;

// $ExpectType "-808665613705806138579.925244847805684"
type ExtFloatCase409 = Add<"-808665613705806138579.9252448473426840", "-0.000000000463">;

// $ExpectType "-21.03427737405068094911902806222470481154"
type ExtFloatCase410 = Add<"-21.0343150", "0.00003762594931905088097193777529518846">;

// $ExpectType "-73131153293465264.4809999999999999999700435"
type ExtFloatCase411 = Add<"0.0000000000000000000299565", "-73131153293465264.481">;

// $ExpectType "16899677.0000000000000006200595313980106282035"
type ExtFloatCase412 = Add<"16899677", "0.0000000000000006200595313980106282035">;

// $ExpectType "218.125659097300722844253386444527"
type ExtFloatCase413 = Add<"218.110682218445321922075046444527", "0.01497687885540092217834">;

// $ExpectType "1.66374869673508899992510422157416806083"
type ExtFloatCase414 = Add<"-0.00000000000000000007489577842583193917", "1.663748696735089">;

// $ExpectType "-1940.912314664108494674982087247394262720711"
type ExtFloatCase415 = Add<"12.244685335891505325017912752605737279289", "-1953.157">;

// $ExpectType "-13125.9999383032589193733228617357911107628032"
type ExtFloatCase416 = Add<"-13126.0", "0.0000616967410806266771382642088892371968">;

// $ExpectType "-358935750922084.2592219004802490902523174719"
type ExtFloatCase417 = Add<"-358935750965455.3592219004802490902523174719", "43371.1">;

// $ExpectType "232389665408735.00000000000000000268393845813954"
type ExtFloatCase418 = Add<"0.00000000000000000268393845813954", "232389665408735">;

// $ExpectType "157678510.5484793394890156751921759005061"
type ExtFloatCase419 = Add<"157678510.5484789671095156751921759005061", "0.0000003723795">;

// $ExpectType "19679349947734.356763430706874970698304897"
type ExtFloatCase420 = Add<"19679349947742.994127711806874970698304897", "-8.6373642811">;

// $ExpectType "26203291465.139502335741324417441717"
type ExtFloatCase421 = Add<"26203291462.747893543000897830970817", "2.39160879274042658647090">;

// $ExpectType "298129425197708.693952796320806357536"
type ExtFloatCase422 = Add<"297611546807476.7389967424", "517878390231.954956053920806357536">;

// $ExpectType "-15841465782.30635796333567135289691949618"
type ExtFloatCase423 = Add<"-15841465782.23786068092567135289691949618", "-0.06849728241">;

// $ExpectType "3208.33470000077141109510594202471060992900492"
type ExtFloatCase424 = Add<"0.00000000077141109510594202471060992900492", "3208.3347">;

// $ExpectType "-0.9999966708008435101083674721264298259926753172"
type ExtFloatCase425 = Add<"-1", "0.00000332919915648989163252787357017400732468280">;

// $ExpectType "-46699431235320232532.675089515806044181377"
type ExtFloatCase426 = Add<"-46699431235320232532.67509849580", "0.000008979993955818623">;

// $ExpectType "-371081877267739.52921835571933788299461"
type ExtFloatCase427 = Add<"0.00000000397559426", "-371081877267739.52921835969493214299461">;

// $ExpectType "-195.167235275136332821923421758842479942641049"
type ExtFloatCase428 = Add<"0.213764724863667178076578241157520057358951", "-195.381">;

// $ExpectType "-2300076810787431.7782224182709646649809"
type ExtFloatCase429 = Add<"-6276754.7824301277909646649809", "-2300076804510676.99579229048">;

// $ExpectType "802625930614315.9805947195646834588541152620643"
type ExtFloatCase430 = Add<"253.01", "802625930614062.9705947195646834588541152620643">;

// $ExpectType "351064.4582191471915625045518645286799297001422"
type ExtFloatCase431 = Add<"351474.4", "-409.9417808528084374954481354713200702998578">;

// $ExpectType "-36873417582473848.53860532807391597443"
type ExtFloatCase432 = Add<"-36873417583534015.45598304691218697443", "1060166.917377718838271">;

// $ExpectType "42.9342796393702000040282063397187671534478"
type ExtFloatCase433 = Add<"0.0000000000000000040282063397187671534478", "42.9342796393702">;

// $ExpectType "0.302800000000000000254561077129670600967185643"
type ExtFloatCase434 = Add<"0.30280", "0.000000000000000000254561077129670600967185643">;

// $ExpectType "13584368794590930.87633212897986415743426966"
type ExtFloatCase435 = Add<"13584368794590929.65056685978986415743426966", "1.22576526919">;

// $ExpectType "26538.51764995426759999340706925592568248738"
type ExtFloatCase436 = Add<"-0.00000000000000000659293074407431751262", "26538.5176499542676">;

// $ExpectType "-12686797041.88774577695001443655416647045"
type ExtFloatCase437 = Add<"-0.00016620663104623655416647045", "-12686797041.8875795703189682">;

// $ExpectType "-7.3000000091386734958004013759891573873629383131"
type ExtFloatCase438 = Add<"-7.3", "-0.0000000091386734958004013759891573873629383131">;

// $ExpectType "42293783764.368804977661402545129958269578"
type ExtFloatCase439 = Add<"-0.01849718975477457", "42293783764.387302167416177115129958269578">;

// $ExpectType "121880355124.0806064743311038669707615864"
type ExtFloatCase440 = Add<"-1433073.1818631797258961330292384136", "121881788197.262469654057">;

// $ExpectType "-2162358649612388.8747144134451642962816183"
type ExtFloatCase441 = Add<"-665097561.949707", "-2162357984514826.9250074134451642962816183">;

// $ExpectType "-0.0605349026669666080681561992402318"
type ExtFloatCase442 = Add<"0.000000000000002700871444392", "-0.0605349026669693089396005912402318">;

// $ExpectType "-4821483203793.494410932955118818692907867"
type ExtFloatCase443 = Add<"-4821483203793.49440644526137664", "-0.000004487693742178692907867">;

// $ExpectType "-2022953222091356.374372445814367718115"
type ExtFloatCase444 = Add<"-838501752798.326614960580367718115", "-2022114720338558.047757485234">;

// $ExpectType "203522961261521258.777841156179888421929"
type ExtFloatCase445 = Add<"203522961261530443.917820906776579027929", "-9185.139979750596690606">;

// $ExpectType "4228.494108579658047139723967516705914275"
type ExtFloatCase446 = Add<"4228.494108579658047102292", "0.000000000000000037431967516705914275">;

// $ExpectType "-371577606534.62392859220190102349314418"
type ExtFloatCase447 = Add<"-371577606534.62392858950803524930468", "-0.00000000269386577418846418">;

// $ExpectType "-44832078259011.5559354329584119306061142344222751"
type ExtFloatCase448 = Add<"0.1199645670415880693938857655777249", "-44832078259011.6759">;

// $ExpectType "-176219478666778.390319999998208557077898557849735"
type ExtFloatCase449 = Add<"0.000000000001791442922101442150265", "-176219478666778.39032">;

// $ExpectType "178191.66604428473765412818222738459872958"
type ExtFloatCase450 = Add<"178191.66604428931197081347222738459872958", "-0.00000000457431668529">;

// $ExpectType "5309557809140.48165399021279131413495227030075"
type ExtFloatCase451 = Add<"5276177017268.35565399021279131413495227030075", "33380791872.126">;

// $ExpectType "-6.999999999999967913303165185938445728172081537833937"
type ExtFloatCase452 = Add<"0.000000000000032086696834814061554271827918462166063", "-7">;

// $ExpectType "17828132134.504124302307667013531128306734169323"
type ExtFloatCase453 = Add<"17828132133.73128014639", "0.772844155917667013531128306734169323">;

// $ExpectType "1.0843090172862542057515049604976685056082181"
type ExtFloatCase454 = Add<"1.084309017285818872", "0.0000000000004353337515049604976685056082181">;

// $ExpectType "-16102511193600.2086255744078079570347266523807661"
type ExtFloatCase455 = Add<"-16102511193600.208625575", "0.0000000005921920429652733476192339">;

// $ExpectType "158456457583273515.564255833274845677273050725"
type ExtFloatCase456 = Add<"-1895.5870000978149", "158456457583275411.151255931089745677273050725">;

// $ExpectType "-3272983.00541327910615128341536014594398120471"
type ExtFloatCase457 = Add<"81952.93187082317", "-3354935.93728410227615128341536014594398120471">;

// $ExpectType "-691678464095856590.95634629971563612935402102"
type ExtFloatCase458 = Add<"-691678464095856590.95634633025558439435402102", "0.000000030539948265">;

// $ExpectType "29937585327739987.37796829207643450728904"
type ExtFloatCase459 = Add<"29982214095954021.68565215319585", "-44628768214034.30768386111941549271096">;

// $ExpectType "-81190157394157.3773000000000320757814372847561957016"
type ExtFloatCase460 = Add<"-0.0000000000000320757814372847561957016", "-81190157394157.37730">;

// $ExpectType "-1.6044451652901516151213935212439847790348679317361"
type ExtFloatCase461 = Add<"-1.60444805", "0.0000028847098483848786064787560152209651320682639">;

// $ExpectType "-6632946124.9569670001116085422461386479567752"
type ExtFloatCase462 = Add<"0.0000000000000004071", "-6632946124.9569670001116089493461386479567752">;

// $ExpectType "15967162444205703.4897529002028031530038278"
type ExtFloatCase463 = Add<"15967162444205725.5835876977581985895876178", "-22.09383479755539543658379">;

// $ExpectType "3419034647852504243.40000000000000000001109196145046743"
type ExtFloatCase464 = Add<"3419034647852504243.4", "0.00000000000000000001109196145046743">;

// $ExpectType "-0.18412157971732197634799642162905185759509417879"
type ExtFloatCase465 = Add<"-0.184121579717", "-0.00000000000032197634799642162905185759509417879">;

// $ExpectType "657.446907909304167145823664868955326818618973"
type ExtFloatCase466 = Add<"657.44690790930416714587", "-0.000000000000000000046335131044673181381027">;

// $ExpectType "-2291330567445.02009180892938443702777764811193148332"
type ExtFloatCase467 = Add<"-0.00000034692938443702777764811193148332", "-2291330567445.020091462">;

// $ExpectType "-2.800000000001829913701194321808657770171290559944848203"
type ExtFloatCase468 = Add<"-2.8", "-0.000000000001829913701194321808657770171290559944848203">;

// $ExpectType "-254953108518285986.07910144271207423934923587934451351214"
type ExtFloatCase469 = Add<"-254953108518285985", "-1.07910144271207423934923587934451351214">;

// $ExpectType "-6157155680.90591200915049610499833418951253059357"
type ExtFloatCase470 = Add<"-66398807.32298869", "-6090756873.58292331915049610499833418951253059357">;

// $ExpectType "2455.1299814931462829678262609501288363112688"
type ExtFloatCase471 = Add<"1205.34627565144026871663097", "1249.7837058417060142511952909501288363112688">;

// $ExpectType "-329678350728597.3958196996612366385400490474513156349559"
type ExtFloatCase472 = Add<"-329678350725130.3958196996612366385400490474513156349559", "-3467">;

// $ExpectType "33382216672582.0742647982354321489412099873134278851"
type ExtFloatCase473 = Add<"0.0000000016630321489412099873134278851", "33382216672582.0742647965724">;

// $ExpectType "0.0077244807046337802859776687821282016447278885"
type ExtFloatCase474 = Add<"-0.0000000739096483131943", "0.0077245546142820934802776687821282016447278885">;

// $ExpectType "-148437240520657824.700861667868435229307716047"
type ExtFloatCase475 = Add<"423939022366100.1303605421315647706922839530", "-148861179543023924.831222210">;

// $ExpectType "7460669.6233221933856360936994951958191632578932339027257"
type ExtFloatCase476 = Add<"7453449.6233221933856360936994951958191632578932339027257", "7220.0">;

// $ExpectType "-16125521840386.2000001736810132395059213491577845055187737"
type ExtFloatCase477 = Add<"-0.0000001736810132395059213491577845055187737", "-16125521840386.2">;

// $ExpectType "-105740086870.88805120731703597487939252887655925"
type ExtFloatCase478 = Add<"-105740086870.87902330897898941693939252887655925", "-0.00902789833804655794">;

// $ExpectType "-3937395174660.5290846530069992609919307115632"
type ExtFloatCase479 = Add<"-3937382504232.4631934324802032008", "-12670428.0658912205267960601919307115632">;

// $ExpectType "-1691047173618378119.8797144744337845447480409090470639328"
type ExtFloatCase480 = Add<"-1691047173618367369.8797144744337845447480409090470639328", "-10750">;

// $ExpectType "-26584742.26667643650870850720626411936351306"
type ExtFloatCase481 = Add<"-26584742.26667643650870662855172761916351306", "-0.00000000000000187865453650020">;

// $ExpectType "76.93665988760181451814202793941924424687995851136"
type ExtFloatCase482 = Add<"76.93666308278743385854202793941924424687995851136", "-0.0000031951856193404">;

// $ExpectType "-10469.58581784685565237116592846593298608566213"
type ExtFloatCase483 = Add<"-10469.58581784685565292886210019593298608566213", "0.00000000000000055769617173">;

// $ExpectType "-1054.8242913352942784572319055439135116531558986209068305"
type ExtFloatCase484 = Add<"0.0001296647057215427680944560864883468441013790931695", "-1054.824421">;

// $ExpectType "80998.92999999999999999334273563727762436100482079106898009"
type ExtFloatCase485 = Add<"80998.93", "-0.000000000000000006657264362722375638995179208931019910">;

// $ExpectType "-92699966165682312.6406456761799758113439947795642627"
type ExtFloatCase486 = Add<"-92699966163766696.7490442006", "-1915615.8916014755799758113439947795642627">;

// $ExpectType "3951981877.706350000000000000551032982567013358317393735391"
type ExtFloatCase487 = Add<"0.000000000000000000551032982567013358317393735391", "3951981877.70635">;

// $ExpectType "56147277645684.4233815342647577519898276000725944344977704"
type ExtFloatCase488 = Add<"0.0040413342647577519898276000725944344977704", "56147277645684.4193402">;

// $ExpectType "0.02561978181850795804730798168577066038184079"
type ExtFloatCase489 = Add<"-0.00000000000000000034052335201240933961815921", "0.025619781818507958387831333698180">;

// $ExpectType "-1327351.46438658329305537261326345603473465014"
type ExtFloatCase490 = Add<"-1327351.46438658329883133911209577075273465014", "0.000000000005775966498832314718">;

// $ExpectType "-50146020.13136917438523439037364041570643531039880309166796"
type ExtFloatCase491 = Add<"-50146741.71136917438523439037364041570643531039880309166796", "721.58">;

// $ExpectType "172.346751190000019478219401872667571256888553179333787767"
type ExtFloatCase492 = Add<"0.000000000000019478219401872667571256888553179333787767", "172.34675119">;

// $ExpectType "9444317260148.45543205995451356056178885690131013907"
type ExtFloatCase493 = Add<"0.00543767539426789750178885690131013907", "9444317260148.44999438456024566306">;

// $ExpectType "-2288485846519565.908821663549464265503879091759952912765557"
type ExtFloatCase494 = Add<"-0.000001663549464265503879091759952912765557", "-2288485846519565.90882">;

// $ExpectType "137199858848666.537558998245061942632400300812048"
type ExtFloatCase495 = Add<"-13600.9931855956842627546715", "137199858862267.530744593929324697303900300812048">;

// $ExpectType "-3638839062523.16788353204231378795138113805005277262"
type ExtFloatCase496 = Add<"-0.000000000000000000500", "-3638839062523.16788353204231378745138113805005277262">;

// $ExpectType "-15.5019573099870233155523197897953953143964326167795034464"
type ExtFloatCase497 = Add<"0.0000000000129766844476802102046046856035673832204965536", "-15.50195731">;

// $ExpectType "1463.519950159589386767747393853048424524035753709977"
type ExtFloatCase498 = Add<"5.236129243946948546627393853048424524035753709977", "1458.28382091564243822112">;

// $ExpectType "-78075676178.000000000000681090019432916245992942611570731948008"
type ExtFloatCase499 = Add<"-0.000000000000681090019432916245992942611570731948008", "-78075676178">;

// $ExpectType "251290.0290000408265742458950413927784669187015196483849964746"
type ExtFloatCase500 = Add<"251290.029", "0.0000000408265742458950413927784669187015196483849964746">;

// $ExpectType "-0.000074514999177477913024584258833863547655756786337576731"
type ExtFloatCase501 = Add<"-0.000074515", "0.000000000000822522086975415741166136452344243213662423269">;

// $ExpectType "369526947446564945079.37850906249788885089868282383289"
type ExtFloatCase502 = Add<"-2873277.7031566090883", "369526947446567818357.08166567158618885089868282383289">;

// $ExpectType "-553980530.6555015045672618892343007508509027941489605"
type ExtFloatCase503 = Add<"-554004567.5248864688113348892343007508509027941489605", "24036.8693849642440730">;

// $ExpectType "29645237.75027687081169523907266152366020721966409"
type ExtFloatCase504 = Add<"0.00000000103600815339389940326020721966409", "29645237.7502768697756870856787621204">;

// $ExpectType "-228105253425581860.999914562157754854498184481604990141872496502"
type ExtFloatCase505 = Add<"0.000085437842245145501815518395009858127503498", "-228105253425581861">;

// $ExpectType "148234016059793326348.6788209767349144339533211870752690573886"
type ExtFloatCase506 = Add<"148234016059793326337.640", "11.03882097673491443395332118707526905738860">;

// $ExpectType "489285196659741383.0062977508385200787337880749767798"
type ExtFloatCase507 = Add<"-0.0000000000000079666993349250232202", "489285196659741383.006297750838528045433123">;

// $ExpectType "111202958447.4628755560175103213740842327570768605596136302"
type ExtFloatCase508 = Add<"111202958445.9250724298025103213740842327570768605596136302", "1.537803126215">;

// $ExpectType "-47056044.23637120472697551002238733952185393859212"
type ExtFloatCase509 = Add<"-1549912.8026532077081092082547", "-45506131.43371799701886630176768733952185393859212">;

// $ExpectType "3.60599999773542573749045329843820870370874619742557316627332021"
type ExtFloatCase510 = Add<"3.606", "-0.00000000226457426250954670156179129629125380257442683372667979">;

// $ExpectType "-104080.316243785654702164704404423085837773814117646284"
type ExtFloatCase511 = Add<"-104080.3162441765370132760114", "0.000000390882311111306995576914162226185882353716">;

// $ExpectType "8531356548289.680000000001066338540310257927026556714786742480592"
type ExtFloatCase512 = Add<"8531356548289.68", "0.0000000000010663385403102579270265567147867424805920">;

// $ExpectType "168095465368167755.201319999999899229973932337477349032998203607"
type ExtFloatCase513 = Add<"168095465368167755.20132", "-0.000000000000100770026067662522650967001796393">;

// $ExpectType "5321976.19446200062660860859824908696344225671974056962030135135"
type ExtFloatCase514 = Add<"5321976.194462", "0.00000000062660860859824908696344225671974056962030135135">;

// $ExpectType "-0.72148924607942442502357442219865587861299162884"
type ExtFloatCase515 = Add<"-0.0000000000000000014803670473728307445", "-0.72148924607942442354320737482582513411299162884">;

// $ExpectType "188974623061492483.14280380927066192414579360416066408"
type ExtFloatCase516 = Add<"188974623061492483.142804194521468235379066778", "-0.00000038525080631123327317383933592">;

// $ExpectType "7878332.29528189839243132714959294521584605677864341"
type ExtFloatCase517 = Add<"-0.00000083671937317281562083962202394322135659", "7878332.295282735111804499965213784837870">;

// $ExpectType "0.0025851128890324925788738738557412646944032455769768734602"
type ExtFloatCase518 = Add<"0.00054054406579017", "0.0020445688232423225788738738557412646944032455769768734602">;

// $ExpectType "92859361383.1153041108614727332170597292791482"
type ExtFloatCase519 = Add<"115404161731.4660458068936241750308873387559102", "-22544800348.350741696032151441813827609476762">;

// $ExpectType "-250496163283427.03770836536163790335018945716578328065826254"
type ExtFloatCase520 = Add<"-12317435659483.46", "-238178727623943.57770836536163790335018945716578328065826254">;

// $ExpectType "-110441943210894668.7807891967357247005456003609278660643"
type ExtFloatCase521 = Add<"-96.8977819169541179624268824", "-110441943210894571.8830072797816067381187179609278660643">;

// $ExpectType "0.000019230208356141315653926790412186263902475539"
type ExtFloatCase522 = Add<"0.00000000000000000063529152935584224393904", "0.000019230208356140680362397434569942324862475539">;

// $ExpectType "0.0001183766448607143702316173650526018028825820894748606870475"
type ExtFloatCase523 = Add<"-0.0000000000000015", "0.0001183766448622143702316173650526018028825820894748606870475">;

// $ExpectType "-1252692089088.38705395603485201266905849077718172383773866152054"
type ExtFloatCase524 = Add<"-1519120.89697395603485201266905849077718172383773866152054", "-1252690569967.49008">;

// $ExpectType "16333090935253714.58962635061682184636931699050749140820690474454775"
type ExtFloatCase525 = Add<"16333090935253715.586262", "-0.99663564938317815363068300949250859179309525545225">;

// $ExpectType "11625246.252195000000000003335311368665523611587019174560510460814765"
type ExtFloatCase526 = Add<"0.0000000000000000033353113686655236115870191745605104608147650", "11625246.252195">;

// $ExpectType "-655.2086077750700808835421364098947875225941477085450778"
type ExtFloatCase527 = Add<"-0.0000811390350949663620350120726675225941477085450778", "-655.20852663603498591718010139782212">;

// $ExpectType "4594193.672287496737761641402840568569137816292501654869263256716904015818"
type ExtFloatCase528 = Add<"4594184.672287496737761641402840568569137816292501654869263256716904015818", "9">;

// $ExpectType "-614730534926067941867.0000000000000000000351971832201257343216570588903268"
type ExtFloatCase529 = Add<"-0.0000000000000000000351971832201257343216570588903268", "-614730534926067941867">;

// $ExpectType "-136107941934475937.8307805695404505530444025267717911901455425332152"
type ExtFloatCase530 = Add<"0.1848091145595494469555974732282088098544574667848", "-136107941934475938.0155896841">;

// $ExpectType "-13.731026950999480934025087015633647040989364623056322800306898676442"
type ExtFloatCase531 = Add<"-13.731026951", "0.000000000000519065974912984366352959010635376943677199693101323558">;

// $ExpectType "-21.35510004122675870003708068517723789583070806501709533"
type ExtFloatCase532 = Add<"-21.35510004122675870004717674727620213", "0.00000000000000000001009606209896423416929193498290467">;

// $ExpectType "-43.1999999999999999911790940273441175045298054009231858499597104759417379"
type ExtFloatCase533 = Add<"-43.2", "0.0000000000000000088209059726558824954701945990768141500402895240582621">;

// $ExpectType "19858.3165045860000000017861940166096730915828677929399660926585274067"
type ExtFloatCase534 = Add<"0.0000000000000000017861940166096730915828677929399660926585274067", "19858.316504586">;

// $ExpectType "-0.0000027294202134627629972127629230005853956836003182"
type ExtFloatCase535 = Add<"0.000000000018235737891993707047558745084", "-0.0000027294384492006549909198104817456693956836003182">;

// $ExpectType "126638770835641531.43887664407358050462299861534710707444"
type ExtFloatCase536 = Add<"129605008229833515.738549411440577906", "-2966237394191984.299672767366997401377001384652892925560">;

// $ExpectType "-278522.037156181209019183587148508740209477127184963777538"
type ExtFloatCase537 = Add<"-0.00000000000406710488085149344523", "-278522.037156181204952078706297015294979477127184963777538">;

// $ExpectType "-16445332684883.22825000000000012333460118914012271577551957339747141406"
type ExtFloatCase538 = Add<"-16445332684883.22825", "-0.00000000000000012333460118914012271577551957339747141406">;

// $ExpectType "-1030343159494167.8231250600743266428937787910059300844067227828979426770965"
type ExtFloatCase539 = Add<"-1030343159494169", "1.17687493992567335710622120899406991559327721710205732290350">;

// $ExpectType "10920811219381.188265976932381120479050874298796374442246866101939364"
type ExtFloatCase540 = Add<"74741.757595631932381120479050874298796374442246866101939364", "10920811144639.430670345">;

// $ExpectType "-4089192.4015452760728673221308125359431921373517956159694967"
type ExtFloatCase541 = Add<"-4089192.401545276102326047095158140681", "0.0000000000294587249643456047378078626482043840305033">;

// $ExpectType "9712716976.556892224960623196470276341735715358740412634164353"
type ExtFloatCase542 = Add<"-0.000253850655677758430078658974284641259587365835647", "9712716976.55714607561630095490035500071">;

// $ExpectType "-50935290675172218.977931369783368907671459355923764911439509141805"
type ExtFloatCase543 = Add<"-58.001178998055584357671459355923764911439509141805", "-50935290675172160.97675237172778455">;

// $ExpectType "242065602.80957412900980568945319333046360406622147289573974183"
type ExtFloatCase544 = Add<"-0.00000000000000008274050377833639593377852710426025817", "242065602.8095741290098057721936971088">;

// $ExpectType "-57581.8753738697125791336896890911603732691263731955475477051763872"
type ExtFloatCase545 = Add<"-0.0000000018996053506896890911603732691263731955475477051763872", "-57581.875373867812973783">;

// $ExpectType "-1442109.8843787319136645103891701894237026329494666670826"
type ExtFloatCase546 = Add<"0.0000000001081504196289698603171046129405333329174", "-1442109.88437873202181493001814004974080724589">;

// $ExpectType "-2408387.959341138290762317769576011627850424091356677719"
type ExtFloatCase547 = Add<"-11371.3496728385913350997078680648168992940913566777190", "-2397016.60966829969942721806170794681095113">;

// $ExpectType "-0.03883790248203830744638623636481843979174220205497715302624"
type ExtFloatCase548 = Add<"0.00000000000000000005248972194638156020825779794502284697376", "-0.0388379024820383074988759583112">;

// $ExpectType "51972.5801195102957737428045450012602842565086416529021258"
type ExtFloatCase549 = Add<"0.0000000000000002334849322956799148269551416529021258", "51972.5801195102957735093196127055803694295535">;

// $ExpectType "13199510653.530022320892070996962046960496506372239727670782057756607"
type ExtFloatCase550 = Add<"13199507764.3046118900484236", "2889.225410430843647396962046960496506372239727670782057756607">;

// $ExpectType "-91.409065205072063191778506766536904858740325580213970209"
type ExtFloatCase551 = Add<"-91.305944234004155285775629491875981263029245580213970209", "-0.10312097106790790600287727466092359571108">;

// $ExpectType "-1690706009848928777.495021644331953071874605016856460586815056781662"
type ExtFloatCase552 = Add<"0.00000000000036703131", "-1690706009848928777.495021644332320103184605016856460586815056781662">;

// $ExpectType "-1252051655803.99999999735117645064206022373446456458585563603313924588284332459"
type ExtFloatCase553 = Add<"-1252051655804", "0.00000000264882354935793977626553543541414436396686075411715667541">;

// $ExpectType "-1980851272305225041.328324583229317984445930035288466162"
type ExtFloatCase554 = Add<"-1981290034036713612.3587708893531360121978707494237", "438761731488571.030446306123818027751940714135233838">;

// $ExpectType "-795.890151236624353437351309515844847551797301121387100829"
type ExtFloatCase555 = Add<"-795.89085780158799717759425220514961346582715", "0.000706564963643740242942689304765914029848878612899171">;

// $ExpectType "-0.55160978350023160500595206459203496829718648251667719"
type ExtFloatCase556 = Add<"0.00000000000000000008559294799519157774769508766803", "-0.551609783500231605091545012587226546044881570184707190">;

// $ExpectType "387.146464771725422256705852754854975406341232062736061643261337037"
type ExtFloatCase557 = Add<"387.146464770977292777877373605881", "0.000000000748129478828479148973975406341232062736061643261337037">;

// $ExpectType "31318.6800000000000000005738499200802402637492440447802302210350633678412977240457"
type ExtFloatCase558 = Add<"0.0000000000000000005738499200802402637492440447802302210350633678412977240457", "31318.68">;

// $ExpectType "-0.0000054898501248548039716822355818187014303371555029332226226"
type ExtFloatCase559 = Add<"-0.0000000090677528576752114233457187000354303371555029332226226", "-0.0000054807823719971287602588898631186660">;

// $ExpectType "-5459.70851205432322972069918826438697269536127473410945873481"
type ExtFloatCase560 = Add<"-5459.708512054323229825378150954057236451373947101", "0.00000000000000010467896268967026375601267236689054126519">;

// $ExpectType "-7136587497.621079458335925342686058725474572508904374334167166919951782"
type ExtFloatCase561 = Add<"-7136587497.6210794583359262865362602", "0.000000000000000943850201474525427491095625665832833080048218">;

// $ExpectType "720874433286547149.2901195999824849899735282420547229682993111302749863874818271"
type ExtFloatCase562 = Add<"720874433286547149.29011960", "-0.0000000000175150100264717579452770317006888697250136125181729">;

// $ExpectType "-208989.208940893838682286096599322082497867233041713587371628"
type ExtFloatCase563 = Add<"-0.002069526456699789023016398781994820749838585707371628", "-208989.20687136738198249707358292330050304648320312788">;

// $ExpectType "-1753778882883960914.76661796129514729867754730395199135571164770741"
type ExtFloatCase564 = Add<"-1753778882883960239.7357211808838917234439093151132461", "-675.03089678041125557523363798883874525571164770741">;

// $ExpectType "-396673155594371.636733862097345863729124263895968424686697360748"
type ExtFloatCase565 = Add<"0.000018752442721586663741713313007598397434839252", "-396673155594371.6367526145400674503928659772089760230841322">;

// $ExpectType "-0.1721217277824204591414365985505347277188701680317422409696115500647420231"
type ExtFloatCase566 = Add<"0.000000014725515297168007", "-0.1721217425079357563094435985505347277188701680317422409696115500647420231">;

// $ExpectType "-10.00792749964389332483912247742860697512808837489638882290363136097"
type ExtFloatCase567 = Add<"0.00000000198897553988595375857564654222391162510361117709636863903", "-10.007927501632868864725076236004253517352">;

// $ExpectType "-0.0000029743857002149728621857413855117071955037370969008155370432"
type ExtFloatCase568 = Add<"-0.0000000017893705878914010575881803996966689837370969008155370432", "-0.00000297259632962708146112815320511201052652">;

// $ExpectType "-534005184647169042.125760079999197120827954194142398171964111230142499031554778"
type ExtFloatCase569 = Add<"-534005184647169042.131454403358674522", "0.005694323359477401172045805857601828035888769857500968445222">;

// $ExpectType "0.00321102635494012077292111654536706872397960143222211004050713636444734673659029505"
type ExtFloatCase570 = Add<"0.0032143", "-0.00000327364505987922707888345463293127602039856777788995949286363555265326340970495">;

// $ExpectType "6403741.63363898434623289109637156147287080946273879160148113766458628106177"
type ExtFloatCase571 = Add<"-16469.08018532953044652581289843852712919053726120839851886233541371893823", "6420210.71382431387667941690927">;

// $ExpectType "-2807730637205.0172616630846217160885944634424250903470652392062406887850232722"
type ExtFloatCase572 = Add<"-2807730637205.01726166308462171615083", "0.0000000000000000000622355365575749096529347607937593112149767278">;

// $ExpectType "19966337.4032747162139531755472099880095767824695677260107514259062814196"
type ExtFloatCase573 = Add<"19966337.40327464680217082908346850752429077", "0.0000000694117823464637414804852860124695677260107514259062814196">;

// $ExpectType "18393642772198629.045955114741024534637216325556374253633041600198429562"
type ExtFloatCase574 = Add<"18393642772198629.04467960835946581820412498120401305795", "0.001275506381558716433091344352361195683041600198429562">;

// $ExpectType "21625227877279.7630000000000000005358606622145297463680878712323075380428171088961554207868"
type ExtFloatCase575 = Add<"0.0000000000000000005358606622145297463680878712323075380428171088961554207868", "21625227877279.763">;

// $ExpectType "-72923320.617494372153361780226619251184174611102621282662689408530004543"
type ExtFloatCase576 = Add<"-75868293.338801243263000230664880224491442311102621282662689408530004543", "2944972.7213068711096384504382609733072677">;

// $ExpectType "3.49999999999994400296367841134220000775902900035713922303379451166080159648969861011317239493"
type ExtFloatCase577 = Add<"-0.00000000000005599703632158865779999224097099964286077696620548833919840351030138988682760507", "3.5">;

// $ExpectType "-141572245488814350551.431338721278969595937436750693180747505198056296244191362365981067"
type ExtFloatCase578 = Add<"865008.237475", "-141572245488815215559.668813721278969595937436750693180747505198056296244191362365981067">;

// $ExpectType "-303514.8254242617746132062432624605213036368824887918212517847890822413245347"
type ExtFloatCase579 = Add<"-303514.82542426177461216895784715957208157971", "-0.0000000000000010372854153009492220571724887918212517847890822413245347">;

// $ExpectType "-8.417942863330392341680315597792114620456629945201714481742115371479319069952739078864753759584"
type ExtFloatCase580 = Add<"-7.74", "-0.677942863330392341680315597792114620456629945201714481742115371479319069952739078864753759584">;

// $ExpectType "-4416.74835750008874954679712971020345607284106825430330344982447309294205280695455856"
type ExtFloatCase581 = Add<"-0.00000000644271271718069271020345607284106825430330344982447309294205280695455856", "-4416.748357493646036829616437">;

// $ExpectType "0.0014970897348316271399696665513926791886689361148588977237211047578120594034554421644608967215193"
type ExtFloatCase582 = Add<"0", "0.0014970897348316271399696665513926791886689361148588977237211047578120594034554421644608967215193">;

// $ExpectType "-139.11767804830719999997381447453146766733004570267824344948319849961538089267915481394242735"
type ExtFloatCase583 = Add<"0.00000000000000000002618552546853233266995429732175655051680150038461910732084518605757265", "-139.1176780483072">;

// $ExpectType "-8211497484.89682727470647674177838880542984806234886506271403452384086288535459484"
type ExtFloatCase584 = Add<"-8211501623.467468766754729150340637983678978062348865062714034523840862885354594840", "4138.57064149204825240856224917824913">;

// $ExpectType "1.0999086685887805762432800078345193586355223652971031667610465439723692625866568559004295306152546314"
type ExtFloatCase585 = Add<"-0.0000913314112194237567199921654806413644776347028968332389534560276307374133431440995704693847453686", "1.1">;

// $ExpectType "267195207086804163668.930290659102447653451335939401648518761487462641959321062946934795"
type ExtFloatCase586 = Add<"-124523382475.065647339231367286548664060598351481238512537358040678937053065205", "267195207211327546143.99593799833381494">;

// $ExpectType "6361232368958886237.1548790794783872489116978681927452197963616657282747082262975470290962423808"
type ExtFloatCase587 = Add<"-0.00000112660065275108830213180725478020363833427172529177370245297090375761920", "6361232368958886237.15488020607904">;

// $ExpectType "36110.1501060052156507296202513207313206470701934642415486029833220604354746534"
type ExtFloatCase588 = Add<"176.49118337833630469590257828139881196863600409523", "35933.6589226268793460337176730393325086784341893690115486029833220604354746534">;

// $ExpectType "-545336428117302.01929617464926317088164827053516092681284043281139576943901664200492350432268165"
type ExtFloatCase589 = Add<"0.04585173770263682911835172946483907318715956718860423056098335799507649567731835", "-545336428117302.06514791235190">;

// $ExpectType "0.00000434994771570661614882084499869756954699103546145561363410307741609902317"
type ExtFloatCase590 = Add<"0.00000000000000000012392510786805471753525331968033845561363410307741609902317", "0.000004349947715706492223712976943980034293671355123">;

// $ExpectType "-81794690209841974748.41779986477335997608296913783317109657150579644016165479898744379"
type ExtFloatCase591 = Add<"-81794690209841974740.53672088428717597735688956390645130995150579644016165479898744379", "-7.88107898048618399872607957392671978662">;

// $ExpectType "25065106878545612.576427583866047248731307249789941994306246940085555148047"
type ExtFloatCase592 = Add<"25062938769541121.630478568522733066136124658086663843828053304849719245047", "2168109004490.945949015343314182595182591703278150478193635235835903">;

// $ExpectType "-2478.29693138821135990216913577415561199399444494666078081038977868515484210481301862362413"
type ExtFloatCase593 = Add<"-2478.622067383552773557059143603127982", "0.32513599534141365489000782897237000600555505333921918961022131484515789518698137637587">;

// $ExpectType "-15946824.09950277073448588573754906079714599141674784744497285127916239700142602"
type ExtFloatCase594 = Add<"-15946824.09950277073438320718451422330046117375794902861875105613916239700142602", "-0.00000000000010267855303483749668481765879881882622179514">;

// $ExpectType "-1156.25130945454647500026757462652163683501169755850542242602493238923104723437063249069491778672"
type ExtFloatCase595 = Add<"0.00000206058115026074270537347836316498830244149457757397506761076895276562936750930508221328", "-1156.25131151512762526101028">;

// $ExpectType "-28125629555.319875442790896131080979434706515929141364365696194890485115866976051969974226520962106271082896"
type ExtFloatCase596 = Add<"-12956.8", "-28125616598.519875442790896131080979434706515929141364365696194890485115866976051969974226520962106271082896">;

// $ExpectType "42998055309766633.161294803536624975807952725443675235133498994154015488631434964418926099"
type ExtFloatCase597 = Add<"48450334100677709.292858595098179054162833212046954235133498994154015488631434964418926099", "-5452278790911076.131563791561554078354880486603279">;

// $ExpectType "-86151293785140264277.387818617919500204506794915221132784856197218478429446796657919285394521228788556955524"
type ExtFloatCase598 = Add<"-0.000000000000000204506794915221132784856197218478429446796657919285394521228788556955524", "-86151293785140264277.3878186179195">;

// $ExpectType "-85966889247898245.45722074402965420877250077049277056387386461138162956320009201234837822718242249019319520691853"
type ExtFloatCase599 = Add<"-0.00000059402965420877250077049277056387386461138162956320009201234837822718242249019319520691853", "-85966889247898245.45722015">;

// $ExpectType "-25.81020207000000519071533416587936690695339761417548103336842871793754911848165182730496781444118812324213700746"
type ExtFloatCase600 = Add<"-0.000000000000005190715334165879366906953397614175481033368428717937549118481651827304967814441188123242137007460", "-25.81020207">;

// $ExpectType "-350080792300.399999999999999981591620177057993010666747251850329844789418951154371046213070599030774219607406069939897"
type ExtFloatCase601 = Add<"0.000000000000000018408379822942006989333252748149670155210581048845628953786929400969225780392593930060103", "-350080792300.4">;

// $ExpectType "38538.499999999996673500728764568467346771581816530605990072308136124872135233722767506078075308574222933091416419520429"
type ExtFloatCase602 = Add<"-0.000000000003326499271235431532653228418183469394009927691863875127864766277232493921924691425777066908583580479571", "38538.5">;

// $ExpectType "6556082.319999999999998144412437143966543633761638775306890801623239227795605799460296580313089678385922213662489535049"
type ExtFloatCase603 = Add<"6556082.32", "-0.000000000000001855587562856033456366238361224693109198376760772204394200539703419686910321614077786337510464951">;

// $ExpectType "-185.999886254076738336272080937797992211167779376737812614771186398616143756105152301597533"
type ExtFloatCase604 = Add<"-185.999886254076738335134043252415796249753374218519734071455", "-0.000000000000000001138037685382195961414405158218078543316186398616143756105152301597533">;

// $ExpectType "0.000005565622153327964338582114318342385890675532349142951521770288606050467173967001464527333472294637844"
type ExtFloatCase605 = Add<"0.000000000098363222378328329588864342385890675532349142951521770288606050467173967001464527333472294637844", "0.000005565523790105586010252525454">;

// $ExpectType "-133560.0035218512759997746723634906933563745716540478550173618522394739650038042489303821914579466383847178647222838936983"
type ExtFloatCase606 = Add<"-133560.04", "0.0364781487240002253276365093066436254283459521449826381477605260349961957510696178085420533616152821352777161063017">;

// $ExpectType "-27708159799503599.1215044393600212685541939067996078907774725322218231069648770193298081146113593454964992974439864811"
type ExtFloatCase607 = Add<"-27708159800573272.0883231101900212685541939067996078907774725322218231069648770193298081146113593454964992974439864811", "1069672.96681867083">;

// $ExpectType "183881988657651220919.56681785565974232048625918587931715311496797038130265358357168647155176800096292869421"
type ExtFloatCase608 = Add<"-29796953630.4913026375328064186913399668764", "183881988687448174550.05812049319254873917759915275571715311496797038130265358357168647155176800096292869421">;

// $ExpectType "-2178986538026.52819166718766834245637565755250114155754042861579405494550640641064108080486501982231697766610369506873393983"
type ExtFloatCase609 = Add<"-2178986538025.6281171045", "-0.90007456268766834245637565755250114155754042861579405494550640641064108080486501982231697766610369506873393983">;

// $ExpectType "-28192491050430.00000000000000912462079748634949064954444536474698633137152955660092121181721134185040726847080723736415320180821995"
type ExtFloatCase610 = Add<"-0.00000000000000912462079748634949064954444536474698633137152955660092121181721134185040726847080723736415320180821995", "-28192491050430">;

// $ExpectType "-1435050.848647657046101438708930395218818069312124176746881282174539906140539486722465500068653075714727202174518522871035823011751"
type ExtFloatCase611 = Add<"-1435068.618647657046101438708930395218818069312124176746881282174539906140539486722465500068653075714727202174518522871035823011751", "17.77">;

// $ExpectType "-601066282116.31494764685146773209952501747493922759252338367702175964980940495419787256355243029368268043408407851578444366"
type ExtFloatCase612 = Add<"-601066282116.773646944861803892913655", "0.45869929801033616081412998252506077240747661632297824035019059504580212743644756970631731956591592148421555634">;

// $ExpectType "2994412679461936566.6701223430612930041038561214620464896310334999888954990348406270150990509811450847539949845450188660574167439"
type ExtFloatCase613 = Add<"-2753001186629.1654476569387069958961438785379535103689665000111045009651593729849009490188549152460050154549811339425832561", "2994415432463123195.83557">;

// $ExpectType "448392812.101885751763742059801420119858000840615513663646321599278426150890005786837699907597501844047946311701498712958992807897"
type ExtFloatCase614 = Add<"448392812.1018844354312957", "0.000001316332446359801420119858000840615513663646321599278426150890005786837699907597501844047946311701498712958992807897">;

// $ExpectType "-77352959873895499881.6761169866532484451942545047771883208798864296915895539879246207978006070788666306"
type ExtFloatCase615 = Add<"-77352959873895499881.6761162233029992762254367454845614002262158269218399300505823906248006070788666306", "-0.000000763350249168968817759292626920653670602769749623937342230173000">;

// $ExpectType "-4.92146656320336859382449065440796322443687142717701285137461854632067721648576908185466372458266592509885076227186959440415252680565838844"
type ExtFloatCase616 = Add<"-5", "0.07853343679663140617550934559203677556312857282298714862538145367932278351423091814533627541733407490114923772813040559584747319434161156">;

// $ExpectType "-0.0005573802068262191609977839161258710643393271233757307937114407266184997518559013565243060131612462006611450037791975727499469"
type ExtFloatCase617 = Add<"-0.0000000000000004372619977839161258710643393271233757307937114407266184997518559013565243060131612462006611450037791975727499469", "-0.000557380206825781899">;

// $ExpectType "9488800455.69384841201125984102869243940420243222736581061677999244886345403385181646604209917629845674090797104700400712679893585"
type ExtFloatCase618 = Add<"4.79698005010389753070269243940420243222736581061677999244886345403385181646604209917629845674090797104700400712679893585", "9488800450.896868361907362310326">;

// $ExpectType "-0.0003855221969981002338769122910576746150547421743926699033531394790438656087102560292178891640591089461854635029030596559151492846691"
type ExtFloatCase619 = Add<"0.0000000000000018997661230877089423253849452578256073300966468605209561343912897439707821108359408910538145364970969403440848507153309", "-0.000385522197">;

// $ExpectType "-0.063341123881303349193718363860328670986487238143320257789798001459627967706982211651872386199270743459561294"
type ExtFloatCase620 = Add<"-0.063341123812589258651794426063119957591863528264980035743077602252627967706982211651872386199270743459561294", "-0.000000000068714090541923937797208713394623709878340222046720399207">;

// $ExpectType "42247382.9702124789428153604897091771602509890798987662405126371182528539235782032471048308136309758292393504217491617538678905797375071319501725"
type ExtFloatCase621 = Add<"42247383.064", "-0.0937875210571846395102908228397490109201012337594873628817471460764217967528951691863690241707606495782508382461321094202624928680498275">;

// $ExpectType "0.00000149496680014893949567083720714164447372286990018294642975122815566995939556502510124016256086916899095831799319898986550479847"
type ExtFloatCase622 = Add<"-0.00000002568121501817024789950645", "0.00000152064801516710974357034365714164447372286990018294642975122815566995939556502510124016256086916899095831799319898986550479847">;

// $ExpectType "-131.663358362633683011116729427305043781268675793293191581524973686213121711511940248723715019273090704861948190956"
type ExtFloatCase623 = Add<"-131.66335836273650457236601594959663422039552341367012898208021864544080993", "0.000000000102821561249286522291590439126847620376937400555244959227688218488059751276284980726909295138051809044">;

// $ExpectType "0.00000793842663906365420702109525770667851136549645370594272233661156089174722056639404425886138539535746075798843345"
type ExtFloatCase624 = Add<"0.00000000000000000077718007226574178859573156113273718366023940333047610", "0.00000793842663906287702694882951591808277980436371652228248293328108479174722056639404425886138539535746075798843345">;

// $ExpectType "298.6456938227849338912311429631828315623468188367675633215060824431686756761249651337224233816329563685023698"
type ExtFloatCase625 = Add<"298.64569377145669370010760887428305419049211767076463966663182890471105450765507454904166021", "0.0000000513282401911235340888997773718547011660029236548742535384576211684698905846807631716329563685023698">;

// $ExpectType "-53035373614.7178059143875002452836340195449902071447782904078118988621086132577851960015209842452000562195423268394360087606799377082728897997"
type ExtFloatCase626 = Add<"0.0000000098475053710376389804550097928552217095921881011378913867422148039984790157547999437804576731605639912393200622917271102003", "-53035373614.717805924235005616321273">;

// $ExpectType "-0.861842291090078562546508074729376353134003306855476620302109284117287492409021088814860434194247026738197653988036119246806849162441857165"
type ExtFloatCase627 = Add<"0.000002397702115545082706325", "-0.86184468879219410762921439972937635313400330685547662030210928411728749240902108881486043419424702673819765398803611924680684916244185716500">;

// $ExpectType "-7445082349676091.435785449007993304165347939108050126867086868884657210375993235717914118961509274141567864905224640936159401056238023115697708114731"
type ExtFloatCase628 = Add<"1924004.96231", "-7445082351600096.3980954490079933041653479391080501268670868688846572103759932357179141189615092741415678649052246409361594010562380231156977081147310">;

// $ExpectType "207724189644.60013964349088998966650899791857056036300267791934105571800636754609729339278308276622409777940247912804080708853009235428453986"
type ExtFloatCase629 = Add<"207724189276.2354966467766137168630074255", "368.36464299671427627280350157241857056036300267791934105571800636754609729339278308276622409777940247912804080708853009235428453986">;

// $ExpectType "-1057235201.5625889131220869437606517118223376107369897317076138705797620611885910564859903965167670077845554058709312065326542523687696158170393314"
type ExtFloatCase630 = Add<"-0.0000000000000000003606517118223376107369897317076138705797620611885910564859903965167670077845554058709312065326542523687696158170393314", "-1057235201.5625889131220869434">;

// $ExpectType "2135955.98546661352963779846049273173163859764487224638711053832956643993343653538383515268139253106808269937151040195861"
type ExtFloatCase631 = Add<"2135955.98546847496701957917801628765161676501430902420565334363847226731093782482383515268139253106808269937151040195861", "-0.00000186143738178071752355591997816736943677781854280530890582737750128944">;

// $ExpectType "-182341620.758639823305722803971462449219840162272462921743710151061224347490857279032440578734301034878039385106761855117009215626217438834157945715438645"
type ExtFloatCase632 = Add<"-182341620.75963819", "0.000998366694277196028537550780159837727537078256289848938775652509142720967559421265698965121960614893238144882990784373782561165842054284561355">;

// $ExpectType "-0.03103709244960236354654503664915830112559855245996913626184516314117790447619983146135603628975290693516239218599205411669"
type ExtFloatCase633 = Add<"-0.0310379152847371895860555796583283692667844392505377548276647230042445", "0.00000082283513482603951054300917006814118588679056861856581955986306659552380016853864396371024709306483760781400794588331">;

// $ExpectType "591589.86000000000000000001860329292788516991407643664465772674133322798829000748004481876019355253701810078529570613237182776549094598706836269877507206606048"
type ExtFloatCase634 = Add<"591589.86", "0.00000000000000000001860329292788516991407643664465772674133322798829000748004481876019355253701810078529570613237182776549094598706836269877507206606048">;

// $ExpectType "1327499528941.259704430156119330898662628106683240194602158057044336643088192293192971501913307764464886787116200010928852119632015468364"
type ExtFloatCase635 = Add<"1327499528941.259705731396165260452862352568124098842440934493864336643088192293192971501913307764464886787116200010928852119632015468364", "-0.0000013012400459295541997244614408586478387764368200">;

// $ExpectType "2265111540331847.4438500000000000026399730647357391221240416795810255729781114791438489591810343937780321771723301295667448186691762052166888791236524529182049438"
type ExtFloatCase636 = Add<"2265111540331847.44385", "0.0000000000000000026399730647357391221240416795810255729781114791438489591810343937780321771723301295667448186691762052166888791236524529182049438">;

// $ExpectType "450814153774.49997691138325805074039557814346654250294326836956127363353081400487645640830466701901373633261713088635262334236413059255012208639263798180866685282946"
type ExtFloatCase637 = Add<"-0.00002308861674194925960442185653345749705673163043872636646918599512354359169533298098626366738286911364737665763586940744987791360736201819133314717054", "450814153774.5">;

// $ExpectType "-0.00492484241769758992911943749886865016089789875776614800639901734661510126669996773420825844721647906790768973764870027244455"
type ExtFloatCase638 = Add<"-0.00000003225236579904856895487056015821433730938371824218643897684349658964835496773420825844721647906790768973764870027244455", "-0.004924810165331790880550482628308491946560589374047905819960040503118511618345">;

// $ExpectType "-71331.43876721613825374268178080407248111339011404114756217274517776052747523361051287405299158155469276811686724307"
type ExtFloatCase639 = Add<"-71331.43876400219162800429885965449977637326182916850599237355086577534159328324037916425312333490817913501686724307", "-0.0000032139466257383829211495727047401282848726415697991943119851858819503701337097998682466465136331">;

// $ExpectType "4531430332.974369182979671300650596571005596211329529395408569955680974100032180279090320416030767773141519700325330306078922884637977114"
type ExtFloatCase640 = Add<"4531430332.974369182979674290738630476176408845410151617472188112662759", "-0.000000000000002990088033905170812634080622222063618156981784899967819720909679583969232226858480299674669693921077115362022886">;

// $ExpectType "3260986081426.592373662347595977007684807572226877635368808858550449900179430725398075422668018325305226767828926369540183994331444452642090521391283"
type ExtFloatCase641 = Add<"39.384744166791242957726294455842839425402642808858550449900179430725398075422668018325305226767828926369540183994331444452642090521391283", "3260986081387.207629495556353019281390351729387452232726">;

// $ExpectType "0.00000429957811933963498807780760827057228530245896747651211303666366712464899890755973779955219440658094362925853693153209608918067"
type ExtFloatCase642 = Add<"0.00000429880802966674008131137959417215280776628630203493369987886551523668068778978", "0.00000000077008967289490676642801409841947753617266544157841315779815188796831111777973779955219440658094362925853693153209608918067">;

// $ExpectType "-2166.66402917367638711177796758750665879707326349452924143528959808406172771844392251655077273026039982145730838447563291749346650348630096104418925967461686234281319"
type ExtFloatCase643 = Add<"-2166.664029173675712500257", "-0.00000000000067461152096758750665879707326349452924143528959808406172771844392251655077273026039982145730838447563291749346650348630096104418925967461686234281319">;

// $ExpectType "-0.00002588643863092160602111706069015143356278254795546360539111399205661396165272430615657485345171214204241945318959511946199226"
type ExtFloatCase644 = Add<"-0.000025886438630912380429166846355627957951159888724105900108725398458013138566376225646226120608061663021", "-0.00000000000000000922559195021433452347561162265923135770528238859359860082308634808051034873284365047902141945318959511946199226">;

// $ExpectType "8.923551142283568768071039692652642906812939852572040712885674310223209094284047459607698055335947512667915174066121939633716016890161019308769354631391389308761882"
type ExtFloatCase645 = Add<"-0.000000000000000200529323920298995078835589947427959287114325689776790905715952540392301944664052487332084825933878060366283983109838980691230645368608610691238118", "8.9235511422835689686003636129516379856485298">;

// $ExpectType "-21556437448948972049.5307444176477747213230298924730762833680031765462968429844719787452311627304796412766893527873030223888386316587631164369500677618609735"
type ExtFloatCase646 = Add<"0.0000000127998547493889280163892364925927466380437055151407280212547688372695203587233106472126969776111613683412368835630499322381390265", "-21556437448948972049.5307444304476294707119579088623127759607498145900023581252">;

// $ExpectType "-101.2715534026991763857630275252765470620131423983964174131648647890199376737294123143215554850258908298728505228195487713881587714484422961615066116684637"
type ExtFloatCase647 = Add<"-101.2715534026922239603773241958969231368570306133332758128133966689708114732", "-0.0000000000069524253857033293796239251561117850631416003514681200491262005294123143215554850258908298728505228195487713881587714484422961615066116684637">;

// $ExpectType "-0.00001057742323776458092358004747823448710588066313422674455720466516411033211728394899912726597123951321896262451176771066761534225489543173636033414059"
type ExtFloatCase648 = Add<"-0.00000000000000000002628376740857869992666514908906633928490609752241821541445544366572977726597123951321896262451176771066761534225489543173636033414059", "-0.00001057742323776455463981263889953456044073157406788745965110714274589491766184028326935">;

// $ExpectType "434515885287.45022424761036636943532639062054279881829488955598131341222086960648146397739976593624137641635494174620728378066598111147687734973630755961025899"
type ExtFloatCase649 = Add<"0.00000000725881132557751716179805811333894302315168261762649561806817469605831550855169620175635494174620728378066598111147687734973630755961025899", "434515885287.45022424035155504385780922882248468547935186640429869578572525153830676791908425738454517466">;

// $ExpectType "-0.000025881909018743211859945545734243453319548908441108921059180644890039401389577326731782425086154232033810712838803596129029770361640568986086478118"
type ExtFloatCase650 = Add<"-0.00002588190901774483141446130106109665568218409839877790718167670204180165388892638488618624373249215908731", "-0.000000000000000998380445484244673146797637364810042331013877503942848237747500650941845596181353662072946500712838803596129029770361640568986086478118">;

// $ExpectType "16740.66633211092036455926905049225924032575781011180547626565233015645057167057115757946357645869288837735786705731897870340100589828258201622"
type ExtFloatCase651 = Add<"-260.8020033716610908017940221805155296272264320025030641582384857795184385939216818072400908848372378517124042819164098083213511102035", "17001.46833548258145536106307267277476995298424211430854042389081593596901026449283938670366734353012622907027133923538851172235700848608201622">;

// $ExpectType "-3144.73816785889763711496073601072139181663581749664315829771220285421861268922661982867681936760300774611876446005645690940170747594642032443019415"
type ExtFloatCase652 = Add<"-0.00000000000001298143460683533187542098532057471443650131347027927061505315402201377004104838055385241660827862931318282364149013913156553270415", "-3144.73816785889762413352612917538951639565049692192872179639873257494799763607259781490677831922245389370215618142714372657806598580728875889749">;

// $ExpectType "-204798018073795.653032577657324316352167874203292177439226270829205887964863306052020361361363816494740640243919259580961765731110330027445118019091320131665778"
type ExtFloatCase653 = Add<"-204798018073795.6529529448002736801844846511974520623046560206000445277488879317921030460527861542787789702381941427349799245079342628083413", "-0.000079632857050636167683223005840115134570250229161360215975374259917315308577662215961670005725116845981841223176067219103818019091320131665778">;

// $ExpectType "227954506189379566132.353104956505414509365483317740028207670869422726484749907137678407334745753105658448917898118381527765265339419955440224579312856148750854636316313786231412879"
type ExtFloatCase654 = Add<"227954506189379566132.3531049565054147523709893227464306251862462550700080825380345883105195752839361334678871895593932042077071912003898512892", "-0.000000000000000243005506005006402417515376832343523332630896909903184829530830475018969291441011676442441851780434411064620687143851249145363683686213768587121">;

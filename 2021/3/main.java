import java.io.File; // Import the File class
import java.io.FileNotFoundException; // Import this class to handle errors
import java.util.ArrayList;
import java.util.Scanner; // Import the Scanner class to read text files
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Day3 {
  public static void main(String[] args) {
    try {
      File input = new File(System.getProperty("user.dir") + "\\2021\\3\\tests\\input.in");
      Scanner inputReader = new Scanner(input);
      String gamma = "";
      String epsilon = "";
      BitCounter[] arr = null;

      ArrayList<String> oxyLines = new ArrayList<String>();
      ArrayList<String> co2Lines = new ArrayList<String>();

      while (inputReader.hasNextLine()) {
        String line = inputReader.nextLine();
        if (arr == null) {
          arr = new BitCounter[line.length()];
        }
        oxyLines.add(line);
        co2Lines.add(line);
        Integer index = 0;

        for (char ch : line.toCharArray()) {
          Integer num = Integer.parseInt(String.valueOf(ch));
          if (arr[index] == null) {
            arr[index] = new BitCounter(0, 0);
          }
          if (num == 0) {
            arr[index].zeroes++;
          } else {
            arr[index].ones++;
          }
          index++;
        }
      }

      for (int i = 0; i < arr.length; i++) {
        if (arr[i].ones > arr[i].zeroes) {
          gamma = gamma + "1";
          epsilon = epsilon + "0";
        } else {
          gamma = gamma + "0";
          epsilon = epsilon + "1";
        }
      }

      Integer index = 0;
      String patternString = "";
      BitCounter[] arr2 = null;

      while (oxyLines.size() > 1 & index < arr.length) {
        arr2 = new BitCounter[arr.length];
        if (arr2[index] == null) {
          arr2[index] = new BitCounter(0, 0);
        }
        //System.out.println("Remaining values: ");
        for (String oxyString : oxyLines) {
          //System.out.println(oxyString);
          Integer idxNum = Integer.parseInt(String.valueOf(oxyString.charAt(index)));
          if (idxNum == 0) {
            arr2[index].zeroes++;
          } else {
            arr2[index].ones++;
          }
        }

        //System.out.println("Arr2 zeroes (" + arr2[index].zeroes + ") at idx: " + index);
        //System.out.println("Arr2 ones (" + arr2[index].ones + ") at idx: " + index);

        if (arr2[index].ones >= arr2[index].zeroes) {
          patternString += "1";
        } else {
          patternString += "0";
        }

        index++;
        for (int i = oxyLines.size()-1; i >= 0; i--) {
          Pattern pattern = Pattern.compile(patternString.concat(".*$"));
          Matcher matcher = pattern.matcher(oxyLines.get(i));
          Boolean matchFound = matcher.matches();
          if (!matchFound) {
            //System.out.println(oxyLines.get(i) + " doesn't match pattern " + pattern);
            oxyLines.remove(i);
          }
        }
      }

      index = 0;
      patternString = "";
      arr2 = null;
      while (co2Lines.size() > 1 & index < arr.length) {
        arr2 = new BitCounter[arr.length];
        if (arr2[index] == null) {
          arr2[index] = new BitCounter(0, 0);
        }
        //System.out.println("Remaining values: ");
        for (String co2String : co2Lines) {
          //System.out.println(oxyString);
          Integer idxNum = Integer.parseInt(String.valueOf(co2String.charAt(index)));
          if (idxNum == 0) {
            arr2[index].zeroes++;
          } else {
            arr2[index].ones++;
          }
        }

        //System.out.println("Arr2 zeroes (" + arr2[index].zeroes + ") at idx: " + index);
        //System.out.println("Arr2 ones (" + arr2[index].ones + ") at idx: " + index);

        if (arr2[index].ones < arr2[index].zeroes) {
          patternString += "1";
        } else {
          patternString += "0";
        }

        index++;
        for (int i = co2Lines.size()-1; i >= 0; i--) {
          Pattern pattern = Pattern.compile(patternString.concat(".*$"));
          Matcher matcher = pattern.matcher(co2Lines.get(i));
          Boolean matchFound = matcher.matches();
          if (!matchFound) {
            //System.out.println(oxyLines.get(i) + " doesn't match pattern " + pattern);
            co2Lines.remove(i);
          }
        }
      }

      Integer gammaDecimal = Integer.parseInt(gamma, 2);
      Integer epsiDecimal = Integer.parseInt(epsilon, 2);
      Integer oxygenDecimal = Integer.parseInt(oxyLines.get(0), 2);
      Integer co2Decimal = Integer.parseInt(co2Lines.get(0), 2);
      System.out.println("The answer to part one is: " + (gammaDecimal * epsiDecimal));
      System.out.println("The answer to part two is: " + (oxygenDecimal * co2Decimal));
      inputReader.close();
    } catch (

    FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}

class BitCounter {
  public int zeroes;
  public int ones;

  BitCounter(int zeroes, int ones) {
    this.ones = ones;
    this.zeroes = zeroes;
  }
}
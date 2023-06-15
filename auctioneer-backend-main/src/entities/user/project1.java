import java.util.*;

public class Project {

	public static double getMax (double[] list) {
        double max = list[0];

        for(Double grade : list) {
            if(grade > max) max = grade;
        }

        return max;
    }
    public static void main (String[] args) {

        double[] grades = {19.4, 13, 12, 11, 20};

        double result = getMax(grades);
        
        System.out.println("the max grade is: " + result);
    }
}


using System;

public class Project
{
    public static double GetMax(double[] list)
    {
        double max = list[0];

        foreach (double grade in list)
        {
            if (grade > max)
                max = grade;
        }

        return max;
    }

    public static void Main()
    {
        double[] grades = { 19.4, 13, 12, 11, 20 };

        double result = GetMax(grades);

        Console.WriteLine("The max grade is: " + result);
    }
}


    def get_max(lst):
        max_value = lst[0]
        for grade in lst:
            if grade > max_value:
                max_value = grade
        return max_value

    def main():
        grades = [19.4, 13, 12, 11, 20]
        result = get_max(grades)
        print("The max grade is:", result)

    if __name__ == "__main__":
        main()
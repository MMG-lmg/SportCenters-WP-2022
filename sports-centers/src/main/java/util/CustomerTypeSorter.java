package util;
import java.util.Comparator;

import beans.CustomerType;

public class CustomerTypeSorter implements Comparator<CustomerType>{

	@Override
	public int compare(CustomerType o1, CustomerType o2) {
		return o2.getPointsNeeded() - o1.getPointsNeeded();
	}

}
